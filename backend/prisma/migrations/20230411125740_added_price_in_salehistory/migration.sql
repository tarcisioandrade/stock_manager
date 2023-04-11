/*
  Warnings:

  - Added the required column `price` to the `sales_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales_history" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
