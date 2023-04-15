import { ProductInput } from "@/types/Product";
import prisma from "@/database/prisma";
import { Product } from "@prisma/client";

export interface IProductRepo {
  addProduct(product: ProductInput): Promise<Product>;
  getProductByName(name: string): Promise<Product | null>;
}

export class ProductRepo implements IProductRepo {
  async addProduct(product: ProductInput) {
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        category_id: product.category_id,
      },
    });

    return newProduct;
  }

  async getProductByName(name: string) {
    const product = await prisma.product.findFirst({
      where: {
        name: name,
      },
    });

    return product;
  }
}
