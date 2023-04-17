import prisma from "@/database/prisma";
import { Branch } from "@prisma/client";

export interface IBranchRepo {
  createBranch(
    name: string,
    location: string,
    entity_id: string
  ): Promise<Branch>;
  getBranchById(id: string): Promise<Branch | null>;
  getAllBranches(
    entity_id: string
  ): Promise<{ branchies: Omit<Branch, "entity_id">[]; total: number }>;
  updateBranch(id: string, updates: Partial<Branch>): Promise<Branch>;
  deleteBranch(id: string): Promise<Branch>;
}

export class BranchRepo implements IBranchRepo {
  async createBranch(name: string, location: string, entity_id: string) {
    const branch = await prisma.branch.create({
      data: {
        name,
        location,
        entity_id,
      },
    });

    return branch;
  }
  async getBranchById(id: string) {
    const branch = await prisma.branch.findUnique({
      where: {
        id,
      },
    });

    return branch;
  }

  async getAllBranches(entity_id: string) {
    const branchies = await prisma.branch.findMany({
      where: { entity_id },
      select: {
        id: true,
        name: true,
        location: true,
        created_at: true,
      },
    });

    return { branchies, total: branchies.length };
  }

  async updateBranch(id: string, updates: Partial<Branch>) {
    const branch = await prisma.branch.update({
      where: {
        id,
      },
      data: updates,
    });

    return branch;
  }
  async deleteBranch(id: string) {
    const branch = await prisma.branch.delete({
      where: {
        id,
      },
    });

    return branch;
  }
}
