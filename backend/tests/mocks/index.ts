import {
  Branch,
  Entity,
  SaleHistory,
  Stock,
  User,
  Product,
  Category,
} from "@prisma/client";
import { mockBranchRepo } from "./mockBranchRepo";
import { mockSaleRepo } from "./mockSaleRepo";
import { mockStockRepo } from "./mockStockRepo";
import { mockResponse } from "./mockResponse";
import { mockProductRepo } from "./mockProductRepo";
import { mockCategoryRepo } from "./mockCategoryRepo";
import { mockUserRepo } from "./mockUserRepo";
import { mockEntityRepo } from "./mockEntityRepo";
import bcrypt from "bcrypt";

const hashPassword = bcrypt.hashSync("12345678", 10);

const mockEntity: Entity = {
  id: "clgjg7yo60000i4botgit71vj",
  name: "Test",
  email: "entity@gmail.com",
  password: hashPassword,
  role: "ADMIN",
  telephone: "7198677855",
  created_at: new Date(),
};

const mockBranch: Branch = {
  id: "clgjg7yon0003i4boefjemtmr",
  created_at: new Date(),
  entity_id: mockEntity.id,
  location: "Salvador/BA",
  name: "Filial Example",
};

const mockUser: User = {
  id: "clgjg7yp30005i4bovgvihup8",
  name: "Tarcisio Andrade",
  email: "user@gmail.com",
  password: hashPassword,
  role: "USER",
  telephone: "7198677855",
  branch_id: mockBranch.id,
  entity_id: mockEntity.id,
  created_at: new Date(),
};

const mockCategory: Category = {
  id: "clgjg7ypb0006i4bolqzus0mi",
  name: "Drinks",
  slug: "drinks",
};

const mockProduct: Product = {
  id: "clgjg7ypm0009i4boh3md8ntf",
  branch_id: mockBranch.id,
  description: "Nice product",
  name: "Product",
  price: 500,
  category_id: mockCategory.id,
};

const mockStock: Stock = {
  id: "clgjg7ypw000bi4bofy4i9xrp",
  branch_id: mockBranch.id,
  product_id: mockProduct.id,
  quantity: 10,
};

const mockSalesHistory: SaleHistory = {
  id: "clgktnqqt0001i4a8mioyg2wc",
  quantity: 10,
  sale_date: new Date(),
  price: 50,
  branch_id: mockBranch.id,
  product_id: mockProduct.id,
  stock_id: mockStock.id,
};

export {
  mockBranchRepo,
  mockSaleRepo,
  mockStockRepo,
  mockEntity,
  mockBranch,
  mockUser,
  mockCategory,
  mockProduct,
  mockStock,
  mockSalesHistory,
  mockProductRepo,
  mockCategoryRepo,
  mockUserRepo,
  mockEntityRepo,
  mockResponse,
};
