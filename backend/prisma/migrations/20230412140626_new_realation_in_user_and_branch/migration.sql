/*
  Warnings:

  - You are about to drop the `_UserBranch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_branches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `branch_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserBranch" DROP CONSTRAINT "_UserBranch_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBranch" DROP CONSTRAINT "_UserBranch_B_fkey";

-- DropForeignKey
ALTER TABLE "users_branches" DROP CONSTRAINT "users_branches_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "users_branches" DROP CONSTRAINT "users_branches_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "branch_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserBranch";

-- DropTable
DROP TABLE "users_branches";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
