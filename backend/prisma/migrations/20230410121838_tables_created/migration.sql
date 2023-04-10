-- CreateTable
CREATE TABLE "branchs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "branchs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_history" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branchId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "stockId" INTEGER,

    CONSTRAINT "sale_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_history" ADD CONSTRAINT "sale_history_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_history" ADD CONSTRAINT "sale_history_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_history" ADD CONSTRAINT "sale_history_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
