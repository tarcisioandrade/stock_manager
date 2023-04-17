import {
  mockResponse,
  mockProductRepo,
  mockBranchRepo,
  mockCategoryRepo,
  mockStockRepo,
  mockCategory,
  mockBranch,
  mockProduct,
  mockStock,
  mockSalesHistory,
} from "./mocks";
import { ProductController } from "@/controllers/Product.controller";
import { BodyToCreateNewProduct } from "@/schemas/ProductSchema";
import { ProductItemResponse } from "@/types/Product";
import { ProductStock } from "@/types/Stock";

const productController = new ProductController(
  mockProductRepo,
  mockCategoryRepo,
  mockStockRepo,
  mockBranchRepo
);

const newProduct: BodyToCreateNewProduct = {
  name: "NewProduct",
  description: "New Product Description",
  price: "R$ 5000,00",
  quantity: "400",
  category_id: mockCategory.id,
  branch_id: mockBranch.id,
};

const stockProduct: ProductStock = {
  id: mockStock.id,
  name: mockProduct.name,
  category_id: mockProduct.category_id,
  description: mockProduct.description,
  price: mockProduct.price,
  stock: {
    id: mockStock.id,
    quantity: mockStock.quantity,
  },
};

const productItemResponse: ProductItemResponse = {
  id: mockProduct.id,
  name: mockProduct.name,
  description: mockProduct.description,
  price: mockProduct.price,
  category: mockProduct.category_id,
  sale_history: [
    {
      price: mockSalesHistory.price,
      quantity: mockSalesHistory.quantity,
      sale_date: mockSalesHistory.sale_date,
    },
  ],
  stock: mockStock.quantity,
};

describe("Product Controller", () => {
  describe("Creating a new Product", () => {
    it("should create a new product", async () => {
      const { req, res } = mockResponse();

      req.body = newProduct;

      mockBranchRepo.getBranchById.mockResolvedValue(mockBranch);
      mockProductRepo.getProductByName.mockResolvedValue(null);
      mockCategoryRepo.getCategoryByID.mockResolvedValue(mockCategory);

      mockProductRepo.addProduct.mockResolvedValue(mockProduct);
      mockStockRepo.addStock.mockResolvedValue(null);

      await productController.createProduct(req, res);

      expect(res.status).toBeCalledWith(201);
      expect(res.json).toBeCalledWith({ id: mockProduct.id });
    });

    it("should return status 400 when try create a product that already exists", async () => {
      const { req, res } = mockResponse();

      req.body = newProduct;

      mockProductRepo.getProductByName.mockResolvedValue(mockProduct);

      await productController.createProduct(req, res);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({ error: "Product already exists" });
    });
  });

  it("should return all products", async () => {
    const { req, res } = mockResponse();
    req.query = {
      branch_id: mockBranch.id,
      category_id: mockCategory.id,
    };

    mockBranchRepo.getBranchById.mockResolvedValue(mockBranch);
    mockCategoryRepo.getCategoryByID.mockResolvedValue(mockCategory);
    mockStockRepo.getAllStocks.mockResolvedValue([stockProduct]);

    await productController.getAllProducts(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ products: [stockProduct] });
  });

  it("should return all categories", async () => {
    const { req, res } = mockResponse();

    mockCategoryRepo.getCategories.mockResolvedValue([mockCategory]);

    await productController.getAllCategories(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ categories: [mockCategory] });
  });

  it("should return a product", async () => {
    const { req, res } = mockResponse();
    req.params = {
      product_id: mockProduct.id,
    };

    mockProductRepo.getProductById.mockResolvedValue(productItemResponse);

    await productController.getProduct(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ product: productItemResponse });
  });

  it("should return status 201 when adding a product stock", async () => {
    const { req, res } = mockResponse();

    req.params = {
      product_id: mockProduct.id,
    };

    req.body = {
      stock_id: mockStock.id,
      quantity: "800",
    };

    mockProductRepo.getProductById.mockResolvedValue(productItemResponse);
    mockStockRepo.updateStock.mockResolvedValue(mockStock);

    await productController.addProductStock(req, res);

    expect(res.sendStatus).toBeCalledWith(201);
  });
});
