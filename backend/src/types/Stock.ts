import { Product } from "@prisma/client";

export type StockType = {
  id: string;
  quantity: number;
  branchId: string;
  productId: string;
};

export type ProductStock = {
  stock: {
    id: string;
    quantity: number;
  } | null;
} & Omit<Product, "branch_id">;
