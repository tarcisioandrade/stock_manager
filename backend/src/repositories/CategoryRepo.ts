import prisma from "@/database/prisma";
import { Category } from "@prisma/client";

export interface ICategoryRepo {
  getCategoryByID(id: string): Promise<Category | null>;
  getCategories(): Promise<Category[]>;
}

export class CategoryRepo implements ICategoryRepo {
  async getCategoryByID(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  async getCategories() {
    const categories = await prisma.category.findMany();

    return categories;
  }
}
