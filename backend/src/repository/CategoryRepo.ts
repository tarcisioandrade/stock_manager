import { CategoryType } from "@/types/Category";

export interface ICategoryRepo {
  getCategoryByID(id: string): Promise<CategoryType>;
}

export class CategoryRepo implements ICategoryRepo {
  async getCategoryByID(id: string): Promise<CategoryType> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }
}
