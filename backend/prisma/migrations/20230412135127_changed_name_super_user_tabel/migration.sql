/*
  Warnings:

  - You are about to drop the `SuperUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "branches" DROP CONSTRAINT "branches_super_user_id_fkey";

-- DropTable
DROP TABLE "SuperUser";

-- CreateTable
CREATE TABLE "super_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "super_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "super_user_email_key" ON "super_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "super_user_telephone_key" ON "super_user"("telephone");

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_super_user_id_fkey" FOREIGN KEY ("super_user_id") REFERENCES "super_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
