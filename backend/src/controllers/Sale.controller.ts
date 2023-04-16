import { ISaleRepo } from "@/repositories/SaleRepo";
import { IStockRepo } from "@/repositories/StockRepo";
import { ZodErrorFormatter } from "@/utils/ZodErrorFormatter";
import { SaleProductSchema } from "@/schemas/SaleSchema";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { IBranchRepo } from "@/repositories/BranchRepo";

export class SaleController {
  constructor(
    private StockRepo: IStockRepo,
    private SaleRepo: ISaleRepo,
    private BranchRepo: IBranchRepo
  ) {
    this.saleProduct = this.saleProduct.bind(this);
    this.getSalesHistory = this.getSalesHistory.bind(this);
  }

  async getSalesHistory(req: Request, res: Response) {
    const { branch_id } = req.params;

    const sales = await this.SaleRepo.getAllSaleHistory(branch_id);

    res.status(200).json(sales);
  }

  async saleProduct(req: Request, res: Response) {
    try {
      const { branch_id } = req.params;
      const { stock_id, quantity, price } = SaleProductSchema.parse(req.body);

      const stock = await this.StockRepo.getStockById(stock_id);
      const branch = await this.BranchRepo.getBranchById(branch_id);

      if (!stock) {
        res.status(400).json({
          error: "Stock not found",
        });
        return;
      }

      if (!branch) {
        res.status(400).json({
          error: "Branch not found",
        });
        return;
      }

      await this.StockRepo.saleProductStock(stock_id, quantity);

      const newSaleHistory = await this.SaleRepo.addSale(
        stock.product_id,
        branch_id,
        quantity,
        price,
        stock_id
      );

      res.status(201).json({ newSaleHistory });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: ZodErrorFormatter(err),
        });
      }
      console.log(err);
      return res.sendStatus(500);
    }
  }
}
