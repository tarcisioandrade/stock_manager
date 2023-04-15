import { ProductController } from "@/controllers/Product.controller";
import { ProductRepo } from "@/repositories/ProductRepo";
import { CategoryRepo } from "@/repositories/CategoryRepo";
import { StockRepo } from "@/repositories/StockRepo";
import { BranchRepo } from "@/repositories/BranchRepo";

const controller = new ProductController(
  new ProductRepo(),
  new CategoryRepo(),
  new StockRepo(),
  new BranchRepo()
);

export default controller;
