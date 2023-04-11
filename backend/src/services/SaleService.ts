import { StockRepo } from "@/repository/StockRepo";
import { SaleRepo } from "@/repository/SaleRepo";
import { SaleController } from "@/controllers/Sale.controller";

const controller = new SaleController(new StockRepo(), new SaleRepo());

export default controller;
