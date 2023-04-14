import { Entity } from "@prisma/client";
import prisma from "@/database/prisma";

export interface IEntityRepo {
  getEntityByEmail(email: string): Promise<Entity | null>;
}

export class EntityRepo implements IEntityRepo {
  async getEntityByEmail(email: string) {
    const entity = await prisma.entity.findUnique({
      where: { email },
    });

    return entity;
  }
}
