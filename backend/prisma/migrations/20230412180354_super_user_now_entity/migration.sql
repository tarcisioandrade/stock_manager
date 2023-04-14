/*
  Warnings:

  - You are about to drop the column `super_user_id` on the `branches` table. All the data in the column will be lost.
  - You are about to drop the column `access` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `super_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `entity_id` to the `branches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "branches" DROP CONSTRAINT "branches_super_user_id_fkey";

-- AlterTable
ALTER TABLE "branches" DROP COLUMN "super_user_id",
ADD COLUMN     "entity_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "access";

-- DropTable
DROP TABLE "super_user";

-- CreateTable
CREATE TABLE "entities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entities_name_key" ON "entities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "entities_email_key" ON "entities"("email");

-- CreateIndex
CREATE UNIQUE INDEX "entities_telephone_key" ON "entities"("telephone");

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
