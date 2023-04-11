import prisma from "@/database/prisma";
import { SaleHistory } from "@prisma/client";

export interface ISaleRepo {
  addSale(
    product_id: string,
    branch_id: string,
    quantity: number,
    price: number,
    stock_id: string
  ): Promise<SaleHistory>;
  getAllSaleHistory(branch_id: string): Promise<SaleHistory[]>;
}

export class SaleRepo implements ISaleRepo {
  async addSale(
    product_id: string,
    branch_id: string,
    quantity: number,
    price: number,
    stock_id: string
  ) {
    const newSaleHistory = await prisma.saleHistory.create({
      data: {
        product_id,
        branch_id,
        quantity,
        price,
        stock_id,
      },
    });

    return newSaleHistory;
  }

  async getAllSaleHistory(branch_id: string) {
    const salesHistory = await prisma.saleHistory.findMany({
      where: {
        branch_id,
      },
    });

    return salesHistory;
  }
}
