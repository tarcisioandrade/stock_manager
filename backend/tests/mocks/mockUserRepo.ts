import { IUserRepo } from "@/repositories/UserRepo";
import { User } from "@prisma/client";

interface UserRepoMock extends IUserRepo {
  createUser: jest.Mock<Promise<User>>;
  getUserByEmail: jest.Mock<Promise<User | null>>;
  updateUser: jest.Mock<Promise<Omit<User, "password">>>;
  getAllUsers: jest.Mock<
    Promise<{
      users: Pick<User, "id" | "email">[];
      total: number;
    }>
  >;
  deleteUser: jest.Mock<Promise<User>>;
}

export const mockUserRepo: UserRepoMock = {
  createUser: jest.fn(),
  getUserByEmail: jest.fn(),
  updateUser: jest.fn(),
  getAllUsers: jest.fn(),
  deleteUser: jest.fn(),
};
