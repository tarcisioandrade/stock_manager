/*
  Warnings:

  - Made the column `categoryId` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stockId` on table `sales_history` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "sales_history" DROP CONSTRAINT "sales_history_stockId_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "sales_history" ALTER COLUMN "stockId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_history" ADD CONSTRAINT "sales_history_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
