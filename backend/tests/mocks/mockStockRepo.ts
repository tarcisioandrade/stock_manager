import { IStockRepo } from "@/repositories/StockRepo";
import { ProductStock } from "@/types/Stock";
import { Stock } from "@prisma/client";

interface StockRepoMock extends IStockRepo {
  getStockById: jest.Mock<Promise<Stock>>;
  saleProductStock: jest.Mock<Promise<Stock>>;
  addStock: jest.Mock;
  updateStock: jest.Mock;
  getAllStocks: jest.Mock<Promise<ProductStock[]>>;
}

export const mockStockRepo: StockRepoMock = {
  getStockById: jest.fn(),
  saleProductStock: jest.fn(),
  addStock: jest.fn(),
  updateStock: jest.fn(),
  getAllStocks: jest.fn(),
};
