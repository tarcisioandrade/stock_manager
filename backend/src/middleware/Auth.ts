import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "@/database/prisma";
import { Entity, User } from "@prisma/client";
require("dotenv").config();

type UserDecodedInfo = {
  id: string;
  role: "ADMIN" | "USER";
  entity_id: string;
};

export async function adminAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token not provided" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
    if (err?.name === "TokenExpiredError") {
      res.sendStatus(401).json({ error: "TokenExpiredError" });
      return;
    }

    const decodedUser = decoded as UserDecodedInfo;

    prisma.entity
      .findUnique({
        where: {
          id: decodedUser.id,
        },
      })
      .then((entity) => {
        if (entity?.role !== "ADMIN") {
          res.sendStatus(401);
          return;
        } else {
          next();
        }
      })
      .catch((err) => {
        res.sendStatus(401);
        return;
      });
  });
}

export async function userAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  let userAuthenticate: User | Entity | null = null;

  if (!token) {
    res.status(401).json({ error: "Token not provided" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
    if (err?.name === "TokenExpiredError") {
      res.sendStatus(401).json({ error: "TokenExpiredError" });
      return;
    }

    const decodedUser = decoded as UserDecodedInfo;

    if (decodedUser.role === "ADMIN") {
      userAuthenticate = await prisma.entity.findUnique({
        where: {
          id: decodedUser.id,
        },
      });
    } else if (decodedUser.role === "USER") {
      userAuthenticate = await prisma.user.findUnique({
        where: {
          id: decodedUser.id,
        },
      });
    }

    if (!userAuthenticate) {
      res.sendStatus(401);
      return;
    } else {
      next();
    }
  });
}
