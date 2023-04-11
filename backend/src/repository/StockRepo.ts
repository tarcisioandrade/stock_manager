import prisma from "@/database/prisma";
import { StockType } from "@/types/Stock";
import { Product } from "@prisma/client";

export interface IStockRepo {
  addStock(
    productId: string,
    branchId: string,
    quantity: number
  ): Promise<void>;
  getStock(branchId: string, categoryId: string, q: string): Promise<Product[]>;
}

export class StockRepo implements IStockRepo {
  async addStock(productId: string, branchId: string, quantity: number) {
    const newStockProduct = await prisma.stock.create({
      data: {
        productId,
        branchId,
        quantity,
      },
    });
  }

  async getStock(branchId: string, categoryId: string, q: string) {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            name: {
              contains: q,
              mode: "insensitive"
            },
          },
          {
            categoryId,
          },
          {
            stocks: {
              some: {
                branchId,
              },
            },
          },
        ],
      },
    });

    return products;
  }
}
