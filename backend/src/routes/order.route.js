import { Router } from "express";
import { protecteRoute } from "../middleware/auth.middleware.js";
import {
    createOrder,
    getUserOrders,
} from "../controllers/order.controller.js";


const orderRouter = Router();

orderRouter.use(protecteRoute);

orderRouter.post("/", createOrder);
orderRouter.get("/", getUserOrders);

export default orderRouter;