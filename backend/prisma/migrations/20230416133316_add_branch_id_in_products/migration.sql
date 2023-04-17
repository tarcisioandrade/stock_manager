/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `branches` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branch_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "branch_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "branches_name_key" ON "branches"("name");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
