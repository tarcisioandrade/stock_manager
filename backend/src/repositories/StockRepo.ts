import prisma from "@/database/prisma";
import { ProductStock, StockType } from "@/types/Stock";
import { Stock } from "@prisma/client";

export interface IStockRepo {
  addStock(
    productId: string,
    branchId: string,
    quantity: number
  ): Promise<void>;
  getAllStocks(
    branchId: string,
    categoryId?: string,
    q?: string
  ): Promise<ProductStock[]>;
  saleProductStock(stock_id: string, quantity: number): Promise<Stock>;
  getStock(stock_id: string): Promise<Stock | null>;
}

export class StockRepo implements IStockRepo {
  async addStock(product_id: string, branch_id: string, quantity: number) {
    await prisma.stock.create({
      data: {
        product_id,
        branch_id,
        quantity,
      },
    });
  }

  async getAllStocks(branch_id: string, category_id?: string, q?: string) {
    let productList: ProductStock[] = [];

    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            category_id,
          },
        ],
      },
      include: {
        stocks: {
          where: {
            branch_id,
          },
        },
      },
    });

    for (let i in products) {
      productList.push({
        id: products[i].id,
        name: products[i].name,
        description: products[i].description,
        price: products[i].price,
        category_id: products[i].category_id,
        stock: {
          id: products[i].stocks[0].id,
          quantity: products[i].stocks[0].quantity,
        },
      });
    }

    return productList;
  }

  async saleProductStock(stock_id: string, quantity: number) {
    const stock = await prisma.stock.update({
      where: {
        id: stock_id,
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    return stock;
  }

  async getStock(stock_id: string) {
    const stock = await prisma.stock.findUnique({
      where: {
        id: stock_id,
      },
    });

    return stock;
  }
}
