import { StockRepo } from "@/repositories/StockRepo";
import { SaleRepo } from "@/repositories/SaleRepo";
import { SaleController } from "@/controllers/Sale.controller";
import { BranchRepo } from "@/repositories/BranchRepo";

const controller = new SaleController(new StockRepo(), new SaleRepo(), new BranchRepo());

export default controller;
