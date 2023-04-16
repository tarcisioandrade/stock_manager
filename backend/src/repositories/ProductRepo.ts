import { ProductInput, ProductItemResponse } from "@/types/Product";
import prisma from "@/database/prisma";
import { Product } from "@prisma/client";

export interface IProductRepo {
  addProduct(product: ProductInput): Promise<Product>;
  getProductByName(name: string): Promise<Product | null>;
  getProductById(id: string): Promise<ProductItemResponse | null>;
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

  async getProductById(id: string) {
    let product: ProductItemResponse | null = null

    const findProduct = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        stocks: {
          select: {
            quantity: true,
          }
        },
        sale_history: {
          select: {
            sale_date: true,
            quantity: true,
            price: true
          }
        },
      },
    });

    if (findProduct) {
      product = {
        id: findProduct.id,
        name: findProduct.name,
        description: findProduct.description,
        price: findProduct.price,
        category: findProduct.category.name,
        stock: findProduct.stocks[0].quantity,
        sale_history: findProduct.sale_history
      };
    }

    return product
  }
}
