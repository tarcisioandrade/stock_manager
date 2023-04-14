import { IBranchRepo } from "@/repository/BranchRepo";
import { ZodErrorFormatter } from "@/utils/ZodErrorFormatter";
import { BranchSchema, EditBranchSchema } from "@/schemas/BranchSchema";
import { Branch } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";

export class BranchController {
  private BranchRepo: IBranchRepo;

  constructor(branchRepo: IBranchRepo) {
    this.BranchRepo = branchRepo;

    this.createBranch = this.createBranch.bind(this);
    this.deleteBranch = this.deleteBranch.bind(this);
    this.updateBranch = this.updateBranch.bind(this);
    this.getBranchies = this.getBranchies.bind(this);
  }

  async createBranch(req: Request, res: Response) {
    try {
      const { name, entity_id, location } = BranchSchema.parse(req.body);

      this.BranchRepo.createBranch(name, location, entity_id)
        .then((branch) => {
          res.status(201).json({ id: branch.id });
        })
        .catch(() => {
          res.status(400).json({ error: "Name already exists." });
          return;
        });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: ZodErrorFormatter(err) });
      } else {
        return res.sendStatus(500);
      }
    }
  }

  async deleteBranch(req: Request, res: Response) {
    const { id } = req.params;

    this.BranchRepo.deleteBranch(id)
      .then(() => res.sendStatus(200))
      .catch(() => res.status(404).json({ error: "Branch not found" }));
  }

  async updateBranch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, location } = EditBranchSchema.parse(req.body);
      let update: Partial<Branch> = {};

      if (name) {
        update.name = name;
      }

      if (location) {
        update.location = location;
      }

      this.BranchRepo.updateBranch(id, update)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: ZodErrorFormatter(err) });
      } else {
        return res.sendStatus(500);
      }
    }
  }

  async getBranchies(req: Request, res: Response) {
    const { branchies, total } = await this.BranchRepo.getAllBranches();

    res.status(200).json({
      branchies,
      total,
    });
  }
}
