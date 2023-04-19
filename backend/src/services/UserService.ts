import { UserController } from "@/controllers/User.controller";
import { UserRepo } from "@/repositories/UserRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const service = new UserController(new UserRepo(), bcrypt, jwt);

export default service;
