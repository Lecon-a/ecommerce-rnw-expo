import { Router } from "express";
import { protecteRoute } from "../middleware/auth.middleware.js";
import {
    createReview,
    getAllReviews,
    deleteReview
} from "../controllers/review.controller.js";


const reviewRouter = Router();

reviewRouter.use(protecteRoute);

reviewRouter.post("/", createReview);
reviewRouter.delete("/:reviewId", deleteReview);
reviewRouter.get("/", getAllReviews);

export default reviewRouter;