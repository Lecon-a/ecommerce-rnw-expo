import { Router } from "express";
import { protecteRoute } from "../middleware/auth.middleware.js";
import {
    
} from "../controllers/product.controller.js";


const productRouter = Router();

productRouter.use(protecteRoute);

productRouter.post("/", () => { });
productRouter.get("/", () => { });

export default productRouter;