import { AuthController } from "@/controllers/Auth.controller";
import { UserRepo } from "@/repository/UserRepo";
import { EntityRepo } from "@/repository/EntityRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const service = new AuthController(
  new UserRepo(),
  new EntityRepo(),
  bcrypt,
  jwt
);

export default service;
