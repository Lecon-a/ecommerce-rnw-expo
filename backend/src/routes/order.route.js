import { Router } from "express";
import { protecteRoute } from "../middleware/auth.middleware";
import {
    createOrder,
    getUserOrders,
} from "../controllers/order.controller";


const orderRouter = Router();

orderRouter.use(protecteRoute);

orderRouter.post("/", createOrder);
orderRouter.get("/", getUserOrders);

export default orderRouter;