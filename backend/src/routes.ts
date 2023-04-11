import { Router } from "express";
import ProductService from "@/services/ProductService";
import SaleService from "@/services/SaleService";

const router = Router();

router.post("/product/add", ProductService.createProduct);
router.get("/product/getall", ProductService.getAllProducts);
router.get("/product/categories", ProductService.getAllCategories);

router.get("/sale/:branch_id", SaleService.getSalesHistory);
router.post("/sale/:branch_id", SaleService.saleProduct);

export default router;
