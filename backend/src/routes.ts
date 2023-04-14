import { Router } from "express";
import ProductService from "@/services/ProductService";
import SaleService from "@/services/SaleService";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { adminAuthorization, userAuthorization } from "./middleware/Auth";

const router = Router();

// AuthService
router.post("/user/signup", adminAuthorization, AuthService.signup);
router.post("/user/signin", AuthService.signin);
router.get("/user/auth", userAuthorization, AuthService.authentication);

// UserService
router.get("/users", adminAuthorization, UserService.getUsers);
router.delete("/users/del/:id", adminAuthorization, UserService.deleteUser);
router.put("/users/edit/:id", userAuthorization, UserService.editUser);

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
