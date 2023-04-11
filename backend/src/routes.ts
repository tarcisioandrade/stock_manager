import { Router } from "express";
import ProductService from "@/services/ProductService";

const router = Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/product/add", ProductService.createProduct);
router.get("/product/getall", ProductService.getAllProducts);

export default router;
