import { Router } from "express";
import { protecteRoute } from "../middleware/auth.middleware.js";
import {
    getProductById
} from "../controllers/product.controller.js";
import { getAllProducts } from "../controllers/admin.controller.js";


const productRouter = Router();

productRouter.use(protecteRoute);

productRouter.post("/", () => { });
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

export default productRouter;