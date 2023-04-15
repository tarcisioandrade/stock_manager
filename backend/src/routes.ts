import { Router } from "express";
import ProductService from "@/services/ProductService";
import SaleService from "@/services/SaleService";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import BranchService from "@/services/BranchService";
import { adminAuthorization, userAuthorization } from "./middleware/Auth";

const router = Router();

// AuthService
router.post("/user/signin", AuthService.signin);
router.get("/user/auth", userAuthorization, AuthService.authentication);

// UserService
router.post("/user/add", adminAuthorization, UserService.createUser);
router.get("/users", adminAuthorization, UserService.getUsers);
router.delete("/users/del/:id", adminAuthorization, UserService.deleteUser);
router.put("/users/edit/:id", userAuthorization, UserService.editUser);

// BranchService
router.post("/branch/add", adminAuthorization, BranchService.createBranch);
router.get("/branchies", adminAuthorization, BranchService.getBranchies);
router.delete("/branch/del/:id", adminAuthorization, BranchService.deleteBranch);
router.put("/branch/edit/:id", adminAuthorization, BranchService.updateBranch);

// ProductService
router.post("/product/add", userAuthorization, ProductService.createProduct);
router.get("/product/getall", userAuthorization, ProductService.getAllProducts);
router.get(
  "/product/categories",
  userAuthorization,
  ProductService.getAllCategories
);

// SaleService
router.get("/sale/:branch_id", userAuthorization, SaleService.getSalesHistory);
router.post("/sale/:branch_id", userAuthorization, SaleService.saleProduct);

export default router;
