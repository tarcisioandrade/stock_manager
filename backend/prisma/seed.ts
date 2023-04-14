import prisma from "../src/database/prisma";
import bcrypt from "bcrypt";

const hashPassword = bcrypt.hashSync("12345678", 10);

async function main() {
  const entity = await prisma.entity.create({
    data: {
      name: "Depósito de Bebidas Marinho O Trancador",
      email: "marinhoeltrancador@gmail.com",
      telephone: "7136274240",
      password: hashPassword,
    },
  });

  const branch = await prisma.branch.create({
    data: {
      name: "Filial Camaçari",
      location: "Camaçari/BA",
      entity_id: entity.id,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "user@gmail.com",
      password: hashPassword,
      entity_id: entity.id,
      branch_id: branch.id,
      name: "Marinho El Trancador",
    },
  });

  const category = await prisma.category.create({
    data: {
      name: "Bebidas",
      slug: "drinks",
    },
  });

  const product = await prisma.product.create({
    data: {
      name: "Cerveja Brahma",
      description: "Cerveja gelada",
      price: 40,
      category_id: category.id,
    },
  });

  await prisma.stock.create({
    data: {
      quantity: 500,
      branch_id: branch.id,
      product_id: product.id,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
