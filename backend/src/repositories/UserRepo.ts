import { User } from "@prisma/client";
import prisma from "@/database/prisma";
import { UserWithBranch } from "@/types/User";

export interface IUserRepo {
  createUser(
    email: string,
    name: string,
    password: string,
    branch_id: string,
    entity_id: string,
    telephone?: string | undefined,
  ): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(
    id: string,
    updates: Partial<User>
  ): Promise<Omit<User, "password">>;
  getAllUsers(): Promise<{
    users: Pick<User, "id" | "email">[];
    total: number;
  }>;
  deleteUser(id: string): Promise<User>;
}

export class UserRepo implements IUserRepo {
  async createUser(
    email: string,
    name: string,
    password: string,
    branch_id: string,
    entity_id: string,
    telephone?: string | undefined,
  ) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        branch_id,
        entity_id,
        telephone,
      },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async updateUser(id: string, updates: Partial<User>) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: updates,
      select: {
        id: true,
        email: true,
        name: true,
        telephone: true,
        branch_id: true,
        entity_id: true,
        role: true,
        created_at: true,
      },
    });

    return user;
  }

  async getAllUsers() {
    let userList: UserWithBranch[] = [];

    const users = await prisma.user.findMany({
      include: {
        branch: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    for (let i in users) {
      userList.push({
        id: users[i].id,
        name: users[i].name,
        email: users[i].email,
        created_at: users[i].created_at,
        branch: {
          id: users[i].branch.id,
          name: users[i].branch.name,
        }
      });
    }
    return { users: userList, total: users.length };
  }

  async deleteUser(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
