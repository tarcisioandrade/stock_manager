import { ISaleRepo } from "@/repositories/SaleRepo";
import { SaleHistory } from "@prisma/client";

interface SaleRepoMock extends ISaleRepo {
  addSale: jest.Mock<
    Promise<SaleHistory>,
    [string, string, number, number, string]
  >;
  getAllSaleHistory: jest.Mock<Promise<SaleHistory[]>, [string]>;
}

export const mockSaleRepo: SaleRepoMock = {
  addSale: jest.fn(),
  getAllSaleHistory: jest.fn(),
};
