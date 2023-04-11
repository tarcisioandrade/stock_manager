import prisma from "@/database/prisma";
import { BranchType } from "@/types/Branch";

export interface IBranchRepo {
  getBranchById(id: string): Promise<BranchType>;
}

export class BranchRepo implements IBranchRepo {
  async getBranchById(id: string) {
    const branch = await prisma.branch.findUnique({
      where: {
        id,
      },
    });

    return branch;
  }
}
