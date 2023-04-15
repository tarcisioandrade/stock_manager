import { UserController } from "@/controllers/User.controller";
import { UserRepo } from "@/repositories/UserRepo";
import bcrypt from "bcrypt";

const service = new UserController(new UserRepo(), bcrypt);

export default service;
