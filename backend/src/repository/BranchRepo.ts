import prisma from "@/database/prisma";
import { Branch } from "@prisma/client";

export interface IBranchRepo {
  getBranchById(id: string): Promise<Branch | null>;
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
