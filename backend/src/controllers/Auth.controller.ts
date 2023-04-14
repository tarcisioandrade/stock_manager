import { IUserRepo } from "@/repository/UserRepo";
import { ZodErrorFormatter } from "@/utils/ZodErrorFormatter";
import { LoginSchema, UserSchema } from "@/schemas/UserSchema";
import { Request, Response } from "express";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Entity } from "@prisma/client";
import { IEntityRepo } from "@/repository/EntityRepo";
require("dotenv").config();

type Bcrypt = typeof bcrypt;
type JWT = typeof jwt;

export class AuthController {
  private UserRepo: IUserRepo;
  private EntityRepo: IEntityRepo;
  private bcrypt: Bcrypt;
  private jwt: JWT;
  constructor(
    userRepo: IUserRepo,
    entityRepo: IEntityRepo,
    bcrypt: Bcrypt,
    jwt: JWT
  ) {
    this.UserRepo = userRepo;
    this.EntityRepo = entityRepo;
    this.bcrypt = bcrypt;
    this.jwt = jwt;

    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.authentication = this.authentication.bind(this);
  }

  async signup(req: Request, res: Response) {
    try {
      const { email, password, branch_id, entity_id, name, telephone } =
        UserSchema.parse(req.body);

      const userValid = await this.UserRepo.getUserByEmail(email);

      if (userValid) {
        res.status(400).json({
          message: "User already exists",
        });
        return;
      }

      const hashedPassword = await this.bcrypt.hash(password, 10);

      const user = await this.UserRepo.createUser(
        email,
        name,
        hashedPassword,
        branch_id,
        entity_id,
        telephone
      );

      res.status(201).json({ id: user.id });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: ZodErrorFormatter(err) });
      } else {
        console.log("err", err);
        return res.sendStatus(500);
      }
    }
  }

  async signin(req: Request, res: Response) {
    try {
      let userAuthenticate: User | Entity | null = null;
      let propsToSignIn: Partial<User> = {};

      const { email, password, type } = LoginSchema.parse(req.body);
      if (type === "ADMIN") {
        userAuthenticate = await this.EntityRepo.getEntityByEmail(email);
        propsToSignIn = {
          id: userAuthenticate?.id,
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

      console.log("SIGNIN", { userAuthenticate, propsToSignIn });

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
