import { IBranchRepo } from "@/repository/BranchRepo";
import { ICategoryRepo } from "@/repository/CategoryRepo";
import { IProductRepo } from "@/repository/ProductRepo";
import { IStockRepo } from "@/repository/StockRepo";
import { ProductSchema } from "@/validators/ProductSchema";
import { Request, Response } from "express";
import { ZodError } from "zod";

export class ProductController {
  private ProductRepo: IProductRepo;
  private CategoryRepo: ICategoryRepo;
  private StockRepo: IStockRepo;
  private BranchRepo: IBranchRepo;

  constructor(
    productRepo: IProductRepo,
    categoryRepo: ICategoryRepo,
    stockRepo: IStockRepo,
    branchRepo: IBranchRepo
  ) {
    this.ProductRepo = productRepo;
    this.CategoryRepo = categoryRepo;
    this.StockRepo = stockRepo;
    this.BranchRepo = branchRepo;

    this.createProduct = this.createProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = ProductSchema.parse(req.body);

      const branch = await this.BranchRepo.getBranchById(product.branchId);
      const nameIsValid = await this.ProductRepo.getProductByName(product.name);
      const category = await this.CategoryRepo.getCategoryByID(
        product.categoryId
      );

      if (!category) {
        res.status(400).json({
          error: "Category not found",
        });
        return;
      }

      if (!branch) {
        res.status(400).json({
          error: "Branch not found",
        });
        return;
      }

      if (nameIsValid) {
        res.status(404).json({
          error: "Product already exists",
        });
        return;
      }

      const newProduct = await this.ProductRepo.addProduct(product);

      await this.StockRepo.addStock(
        newProduct.id,
        product.branchId,
        Number(product.quantity)
      );

      res.status(201).json({ id: newProduct.id });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: err.issues.map((issue) => ({
            path: issue.path[0],
            message: issue.message,
          })),
        });
      }
      console.log(err);
      return res.sendStatus(500);
    }
  }

  async getAllProducts(req: Request, res: Response) {
    const { branchId, q, categoryId } = req.query;

    if (!branchId) {
      res.status(400).json({
        error: "Branch id is required",
      });
      return;
    }

    const category = await this.CategoryRepo.getCategoryByID(
      categoryId as string
    );

    if (!category) {
      res.status(400).json({
        error: "Category not found",
      });
      return;
    }

    const products = await this.StockRepo.getStock(
      branchId as string,
      categoryId as string,
      q as string
    );

    res.status(200).json({ products });
  }
}