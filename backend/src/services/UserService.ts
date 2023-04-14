import { UserController } from "@/controllers/User.controller";
import { UserRepo } from "@/repository/UserRepo";
import { EntityRepo } from "@/repository/EntityRepo";
import bcrypt from "bcrypt";

const service = new UserController(new UserRepo(), new EntityRepo(), bcrypt);

export default service;
