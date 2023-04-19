import { AuthController } from "@/controllers/Auth.controller";
import {
  mockResponse,
  mockUserRepo,
  mockEntityRepo,
  mockEntity,
  mockUser,
} from "./mocks";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authController = new AuthController(
  mockUserRepo,
  mockEntityRepo,
  bcrypt,
  jwt
);

const generateRandomString = Math.random().toString(36).substring(2, 15);

describe("Auth Controller", () => {
  describe("ADMIN", () => {
    it("should return status 200 with correct credentials ", async () => {
      const { req, res } = mockResponse();

      req.body = {
        email: mockEntity.email,
        password: "12345678",
        type: "ADMIN",
      };

      jest.spyOn(jwt, "sign").mockReturnValue(generateRandomString as any);

      mockEntityRepo.getEntityByEmail.mockResolvedValue(mockEntity);

      await authController.signin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: generateRandomString });
    });

    it("should return status 400 with incorrect credentials ", async () => {
      const { req, res } = mockResponse();

      req.body = {
        email: mockEntity.email,
        password: "PASSWORD INCORRECT",
        type: "ADMIN",
      };

      mockEntityRepo.getEntityByEmail.mockResolvedValue(mockEntity);

      await authController.signin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "E-mail or password incorrect.",
      });
    });
  });

  describe("USER", () => {
    it("should return status 200 with correct credentials ", async () => {
      const { req, res } = mockResponse();

      req.body = {
        email: mockUser.email,
        password: "12345678",
        type: "USER",
      };

      jest.spyOn(jwt, "sign").mockReturnValue(generateRandomString as any);

      mockUserRepo.getUserByEmail.mockResolvedValue(mockUser);

      await authController.signin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: generateRandomString });
    });

    it("should return status 400 with incorrect credentials ", async () => {
      const { req, res } = mockResponse();

      req.body = {
        email: mockUser.email,
        password: "PASSWORD INCORRECT",
        type: "USER",
      };

      mockUserRepo.getUserByEmail.mockResolvedValue(mockUser);

      await authController.signin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "E-mail or password incorrect.",
      });
    });
  });
});
