import { IEntityRepo } from "@/repositories/EntityRepo";
import { Entity } from "@prisma/client";

interface EntityRepoMock extends IEntityRepo {
  getEntityByEmail: jest.Mock<Promise<Entity | null>>;
}

export const mockEntityRepo: EntityRepoMock = {
  getEntityByEmail: jest.fn(),
};
