import { BranchController } from "@/controllers/Branch.controller";
import { mockBranchRepo, mockBranch, mockResponse, mockEntity } from "./mocks";
import jwt from "jsonwebtoken";

const branchController = new BranchController(mockBranchRepo);

jest.mock("jsonwebtoken", () => ({
  decode: jest.fn(),
}));

const { req, res } = mockResponse();

describe("Branch Controller", () => {
  beforeEach(() => {
    (jwt.decode as jest.Mock).mockReturnValue({
      id: mockEntity.id,
      role: "ADMIN",
      entity_id: "",
    });

    req.headers = {
      authorization: `Bearer mockToken`,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new branch", async () => {
    req.body = {
      name: "New Branch",
      location: "Salvador/BA",
    };

    mockBranchRepo.createBranch.mockResolvedValue(mockBranch);

    await branchController.createBranch(req, res);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ id: mockBranch.id });
  });

  it("should return status 200 when delete a branch", async () => {
    req.params = {
      id: mockBranch.id,
    };

    mockBranchRepo.deleteBranch.mockResolvedValue(mockBranch);

    await branchController.deleteBranch(req, res);

    expect(res.sendStatus).toBeCalledWith(200);
  });

  it("should return status 200 when update branch is successful", async () => {
    req.params = {
      id: mockBranch.id,
    };
    req.body = {
      name: "New Branch",
      location: "Salvador/BA",
    };

    mockBranchRepo.updateBranch.mockResolvedValue(mockBranch);

    await branchController.updateBranch(req, res);

    expect(res.sendStatus).toBeCalledWith(200);
  });

  it("should return all branches with status code 200", async () => {
    req.params = {
      entity_id: mockEntity.id,
    };

    mockBranchRepo.getAllBranches.mockResolvedValue({
      branchies: [mockBranch],
      total: 1,
    });

    await branchController.getBranchies(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      branchies: [mockBranch],
      total: 1,
    });
  });

  it("should return status code 200 with all branchies", async () => {
    req.params = {
      entity_id: mockEntity.id,
    };

    mockBranchRepo.getAllBranches.mockResolvedValue({
      branchies: [mockBranch],
      total: 1,
    });

    await branchController.getBranchies(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      branchies: [mockBranch],
      total: 1,
    });
  });

  it("should return status code 400 when enitity_id not found", async () => {
    req.params = {};

    await branchController.getBranchies(req, res);

    expect(res.status).toBeCalledWith(400);
  });
});
