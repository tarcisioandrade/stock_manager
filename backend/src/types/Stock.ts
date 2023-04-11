import { Product } from "@prisma/client";
import { BranchType } from "./Branch";

export type StockType = {
  id: string;
  quantity: number;
  branchId: string;
  productId: string;
};
