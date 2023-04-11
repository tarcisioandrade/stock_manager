import { ProductController } from "@/controllers/Product.controller";
import { ProductRepo } from "@/repository/ProductRepo";
import { CategoryRepo } from "@/repository/CategoryRepo";
import { StockRepo } from "@/repository/StockRepo";
import { BranchRepo } from "@/repository/BranchRepo";

const controller = new ProductController(
  new ProductRepo(),
  new CategoryRepo(),
  new StockRepo(),
  new BranchRepo()
);

export default controller;
