import { IUserRepo } from "@/repositories/UserRepo";
import { ZodErrorFormatter } from "@/utils/ZodErrorFormatter";
import { LoginSchema } from "@/schemas/UserSchema";
import { Request, Response } from "express";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Entity } from "@prisma/client";
import { IEntityRepo } from "@/repositories/EntityRepo";

require("dotenv").config();

type Bcrypt = typeof bcrypt;
type JWT = typeof jwt;

export class AuthController {
  constructor(
    private UserRepo: IUserRepo,
    private EntityRepo: IEntityRepo,
    private bcrypt: Bcrypt,
    private jwt: JWT
  ) {
    this.signin = this.signin.bind(this);
    this.authentication = this.authentication.bind(this);
  }

  async signin(req: Request, res: Response) {
    try {
      let userAuthenticate: User | Entity | null = null;
      let propsToSignIn: Partial<User> = {};

      const { email, password, type } = LoginSchema.parse(req.body);
      if (type === "ADMIN") {
        userAuthenticate = await this.EntityRepo.getEntityByEmail(email);
        propsToSignIn = {
          entity_id: userAuthenticate?.id,
          role: userAuthenticate?.role,
        };
      } else if (type === "USER") {
        userAuthenticate = await this.UserRepo.getUserByEmail(email);
        propsToSignIn = {
          id: userAuthenticate?.id,
          role: userAuthenticate?.role,
          entity_id: userAuthenticate?.entity_id,
        };
      }

      
      if (!userAuthenticate) {
        res.status(400).json({
          message: "E-mail or password incorrect.",
        });
        return;
      }

      console.log('userAuthenticate', userAuthenticate)
      console.log('password', password)
      console.log('userAuthenticate.password', userAuthenticate.password)

      const isPasswordValid = await this.bcrypt.compare(
        password,
        userAuthenticate.password
      );

      if (!isPasswordValid) {
        res.status(400).json({
          message: "E-mail or password incorrect.",
        });
        return;
      }

      const token = this.jwt.sign(
        propsToSignIn,
        process.env.JWT_SECRET as string,
        {
          expiresIn: "15d",
        }
      );

      res.status(200).json({ token });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: ZodErrorFormatter(err) });
      } else {
        console.log(err);
        return res.sendStatus(500);
      }
    }
  }

  async authentication(req: Request, res: Response) {
    return res.sendStatus(200);
  }
}
