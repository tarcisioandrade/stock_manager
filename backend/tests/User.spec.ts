import { UserController } from "@/controllers/User.controller";
import {
  mockUserRepo,
  mockUser,
  mockResponse,
  mockEntity,
  mockBranch,
} from "./mocks";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BodyToCreateUser } from "@/schemas/UserSchema";

const userController = new UserController(mockUserRepo, bcrypt, jwt);

const newUser: BodyToCreateUser = {
  email: "newuser@example.com",
  password: "newpassword",
  name: "New User",
  branch_id: mockBranch.id,
};

jest.mock("jsonwebtoken", () => ({
  decode: jest.fn(),
}));

describe("User Contoller", () => {
  it("should create a new user", async () => {
    const { req, res } = mockResponse();
    req.body = newUser;
    req.headers = {
      authorization: `Bearer mockToken`,
    };

    (jwt.decode as jest.Mock).mockReturnValue({
      id: mockEntity.id,
      role: "ADMIN",
      entity_id: "",
    });

    mockUserRepo.getUserByEmail.mockResolvedValue(null);
    mockUserRepo.createUser.mockResolvedValue({
      ...newUser,
      id: "MOCK ID USER",
      role: "USER",
      entity_id: mockEntity.id,
      telephone: "71964788454",
      created_at: new Date(),
    });

    await userController.createUser(req, res);

    expect(jwt.decode).toBeCalledWith("mockToken");
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ id: "MOCK ID USER" });
  });

  it("should return status code 200 with all users disponible", async () => {
    const { req, res } = mockResponse();

    mockUserRepo.getAllUsers.mockResolvedValue({
      users: [{ id: mockUser.id, email: mockUser.email }],
      total: 1,
    });

    await userController.getUsers(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      users: [{ id: mockUser.id, email: mockUser.email }],
      total: 1,
    });
  });

  it("should delete a user and return status code 200", async () => {
    const { req, res } = mockResponse();

    req.params = {
      id: mockUser.id,
    };

    mockUserRepo.deleteUser.mockResolvedValue(mockUser);

    await userController.deleteUser(req, res);

    expect(res.sendStatus).toBeCalledWith(200);
  });

  it("should edit a user and return status code 200", async () => {
    const { req, res } = mockResponse();

    const newInfoUser = {
      name: "new Name",
      email: "new Email@gmail.com",
    };

    req.params = {
      id: mockUser.id,
    };

    req.body = newInfoUser;

    mockUserRepo.updateUser.mockResolvedValue(mockUser);

    await userController.editUser(req, res);

    expect(res.sendStatus).toBeCalledWith(200);
  });
});
