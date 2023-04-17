import { ICategoryRepo } from "@/repositories/CategoryRepo";
import { Category } from "@prisma/client";

interface CategoryRepoMock extends ICategoryRepo {
  getCategoryByID: jest.Mock<Promise<Category | null>>;
  getCategories: jest.Mock<Promise<Category[]>>;
}

export const mockCategoryRepo: CategoryRepoMock = {
  getCategoryByID: jest.fn(),
  getCategories: jest.fn(),
};
