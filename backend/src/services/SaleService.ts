import { StockRepo } from "@/repositories/StockRepo";
import { SaleRepo } from "@/repositories/SaleRepo";
import { SaleController } from "@/controllers/Sale.controller";

const controller = new SaleController(new StockRepo(), new SaleRepo());

export default controller;
