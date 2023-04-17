import { SaleController } from "@/controllers/Sale.controller";
import {
  mockBranch,
  mockBranchRepo,
  mockSaleRepo,
  mockSalesHistory,
  mockStock,
  mockStockRepo,
  mockResponse
} from "./mocks";

const saleController = new SaleController(
  mockStockRepo,
  mockSaleRepo,
  mockBranchRepo
);

describe("Sale Controller", () => {
  it("should call getAllSaleHistory and return sales history", async () => {
    const { req, res } = mockResponse();

    req.params = {
      branch_id: "2",
    };

    mockSaleRepo.getAllSaleHistory.mockResolvedValue([mockSalesHistory]);

    await saleController.getSalesHistory(req, res);

    expect(mockSaleRepo.getAllSaleHistory).toHaveBeenCalledWith("2");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockSalesHistory]);
  });

  it("should sale product and return the sale history", async () => {
    const { req, res } = mockResponse();

    req.params = {
      branch_id: mockBranch.id,
    };

    req.body = {
      stock_id: mockStock.id,
      quantity: "500",
      price: "1200",
    };

    mockSaleRepo.addSale.mockResolvedValue(mockSalesHistory);
    mockStockRepo.getStockById.mockResolvedValue(mockStock);
    mockBranchRepo.getBranchById.mockResolvedValue(mockBranch);
    mockStockRepo.saleProductStock.mockResolvedValue(mockStock);

    await saleController.saleProduct(req, res);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ newSaleHistory: mockSalesHistory });
  });

  it("should return status code 400 when branch does exist", async () => {
    const { req, res } = mockResponse();

    req.params = {
      branch_id: mockBranch.id,
    };

    req.body = {
      stock_id: mockStock.id,
      quantity: "500",
      price: "1200",
    };

    mockBranchRepo.getBranchById.mockResolvedValue(null);

    await saleController.saleProduct(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ error: "Branch not found" });
  });
});
