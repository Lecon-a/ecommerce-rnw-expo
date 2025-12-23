import { Router } from "express";
import { protecteRoute } from "../middleware/auth.middleware.js";
import {
    
} from "../controllers/review.controller.js";


const reviewRouter = Router();

reviewRouter.use(protecteRoute);

reviewRouter.post("/", () => { });
reviewRouter.get("/", () => { });

export default reviewRouter;