import { ISaleRepo } from "@/repository/SaleRepo";
import { IStockRepo } from "@/repository/StockRepo";
import { ZodErrorFormatter } from "@/utils/ZodErrorFormatter";
import { SaleProductSchema } from "@/validators/SaleSchema";
import { Request, Response } from "express";
import { ZodError } from "zod";

export class SaleController {
  private StockRepo: IStockRepo;
  private SaleRepo: ISaleRepo;

  constructor(stockRepo: IStockRepo, saleRepo: ISaleRepo) {
    this.StockRepo = stockRepo;
    this.SaleRepo = saleRepo;

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

      const stock = await this.StockRepo.getStock(stock_id);

      if (!stock) {
        res.status(400).json({
          error: "Stock not found",
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
