import { IUserRepo } from "@/repositories/UserRepo";
import { EditUserSchema, UserSchema } from "@/schemas/UserSchema";
import { Request, Response } from "express";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { ZodErrorFormatter } from "@/utils/ZodErrorFormatter";

type Bcrypt = typeof bcrypt;

export class UserController {
  private UserRepo: IUserRepo;
  private bcrypt: Bcrypt;

  constructor(userRepo: IUserRepo, bcrypt: Bcrypt) {
    this.UserRepo = userRepo;
    this.bcrypt = bcrypt;

    this.getUsers = this.getUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async createUser(req: Request, res: Response) {
    try {
      const { email, password, branch_id, entity_id, name, telephone } =
        UserSchema.parse(req.body);

      const userValid = await this.UserRepo.getUserByEmail(email);

      if (userValid) {
        res.status(400).json({
          message: "User already exists",
        });
        return;
      }

      const hashedPassword = await this.bcrypt.hash(password, 10);

      const user = await this.UserRepo.createUser(
        email,
        name,
        hashedPassword,
        branch_id,
        entity_id,
        telephone
      );

      res.status(201).json({ id: user.id });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: ZodErrorFormatter(err) });
      } else {
        console.log("err", err);
        return res.sendStatus(500);
      }
    }
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

      this.UserRepo.updateUser(id, updates)
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
}
