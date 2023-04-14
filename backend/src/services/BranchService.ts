import { BranchController } from "@/controllers/Branch.controller";
import { BranchRepo } from "@/repository/BranchRepo";

const service = new BranchController(new BranchRepo());

export default service;
