import prisma from "@/database/prisma";

async function main() {
  await prisma.branch.create({
    data: {
      name: "Filial Camaçari",
      location: "Camaçari/BA",
    },
  });

  await prisma.category.create({
    data: {
      name: "drinks",
      slug: "Bebidas",
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