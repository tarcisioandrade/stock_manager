import { IProductRepo } from "@/repositories/ProductRepo";
import { ProductItemResponse } from "@/types/Product";
import { Product } from "@prisma/client";

interface ProductRepoMock extends IProductRepo {
  addProduct: jest.Mock<Promise<Product>>;
  getProductByName: jest.Mock<Promise<Product | null>>;
  getProductById: jest.Mock<Promise<ProductItemResponse | null>>;
}

export const mockProductRepo: ProductRepoMock = {
  addProduct: jest.fn(),
  getProductByName: jest.fn(),
  getProductById: jest.fn(),
};
