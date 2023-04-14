import { IEntityRepo } from "@/repository/EntityRepo";
import { IUserRepo } from "@/repository/UserRepo";
import { EditUserSchema } from "@/validators/UserSchema";
import { Request, Response } from "express";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { ZodErrorFormatter } from "@/utils/ZodErrorFormatter";

type Bcrypt = typeof bcrypt;

export class UserController {
  private UserRepo: IUserRepo;
  private EntityRepo: IEntityRepo;
  private bcrypt: Bcrypt;

  constructor(userRepo: IUserRepo, entityRepo: IEntityRepo, bcrypt: Bcrypt) {
    this.UserRepo = userRepo;
    this.EntityRepo = entityRepo;
    this.bcrypt = bcrypt;

    this.getUsers = this.getUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  async getUsers(req: Request, res: Response) {
    const { users, total } = await this.UserRepo.getAllUsers();

    res.status(200).json({ users, total });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    this.UserRepo.deleteUser(id)
      .then(() => res.sendStatus(200))
      .catch(() => res.status(404).json({ error: "User not found" }));
  }

  async editUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, password, telephone } = EditUserSchema.parse(req.body);

      type Updates = z.infer<typeof EditUserSchema>;

      let updates: Updates = {};

      if (name) {
        updates.name = name;
      }

      if (password) {
        const hashPassword = this.bcrypt.hashSync(password, 10);

        updates.password = hashPassword;
      }

      if (telephone) {
        updates.telephone = telephone;
      }
      
      if (updates) {
        await this.UserRepo.updateUser(id, updates);

        res.sendStatus(200);
        return;
      }

      res.sendStatus(400);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: ZodErrorFormatter(err) });
      } else {
        return res.sendStatus(500);
      }
    }
  }
}
