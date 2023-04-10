/*
  Warnings:

  - The primary key for the `branchs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `sale_history` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sale_history" DROP CONSTRAINT "sale_history_branchId_fkey";

-- DropForeignKey
ALTER TABLE "sale_history" DROP CONSTRAINT "sale_history_productId_fkey";

-- DropForeignKey
ALTER TABLE "sale_history" DROP CONSTRAINT "sale_history_stockId_fkey";

-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_branchId_fkey";

-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_productId_fkey";

-- AlterTable
ALTER TABLE "branchs" DROP CONSTRAINT "branchs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "branchs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "branchs_id_seq";

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "products_id_seq";

-- AlterTable
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "branchId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "stocks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "stocks_id_seq";

-- DropTable
DROP TABLE "sale_history";

-- CreateTable
CREATE TABLE "sales_history" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branchId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "stockId" TEXT,

    CONSTRAINT "sales_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_history" ADD CONSTRAINT "sales_history_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_history" ADD CONSTRAINT "sales_history_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_history" ADD CONSTRAINT "sales_history_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
