import { AuthController } from "@/controllers/Auth.controller";
import { UserRepo } from "@/repositories/UserRepo";
import { EntityRepo } from "@/repositories/EntityRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const service = new AuthController(
  new UserRepo(),
  new EntityRepo(),
  bcrypt,
  jwt
);

export default service;
