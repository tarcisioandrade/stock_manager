import { ProductType } from "@/types/Product";
import prisma from "@/database/prisma";

export interface IProductRepo {
  addProduct(product: ProductType): Promise<ProductType>;
  // getAllProductsWithFilter(
  //   branch: string,
  //   category: string,
  //   q?: string
  // ): Promise<ProductType[]>;
  // sellProduct(id: string, quantity: number): Promise<void>;
  // getAllProducts(): Promise<ProductType[]>;
  getProductByName(name: string): Promise<ProductType>;
}

export class ProductRepo implements IProductRepo {
  async addProduct(product: ProductType) {
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
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
