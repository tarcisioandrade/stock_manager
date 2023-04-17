import { IBranchRepo } from "@/repositories/BranchRepo";
import { Branch } from "@prisma/client";

interface BranchRepoMock extends IBranchRepo {
  createBranch: jest.Mock<Promise<Branch>>;
  getBranchById: jest.Mock<Promise<Branch | null>>;
  getAllBranches: jest.Mock<
    Promise<{ branchies: Omit<Branch, "entity_id">[]; total: number }>
  >;
  updateBranch: jest.Mock<Promise<Branch>>;
  deleteBranch: jest.Mock<Promise<Branch>>;
}

export const mockBranchRepo: BranchRepoMock = {
  createBranch: jest.fn(),
  getBranchById: jest.fn(),
  getAllBranches: jest.fn(),
  updateBranch: jest.fn(),
  deleteBranch: jest.fn(),
};
