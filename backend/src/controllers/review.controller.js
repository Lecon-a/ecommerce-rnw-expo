import { Order } from "../models/order.model.js";
import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";

export async function createReview(req, res) {
    try {
        const { orderId, productId, rating } = req.body;
        
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const user = req.user;

        // verify order exists and is delivered
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({message: "Order not found"})
        }

        if (order.status !== "delivered") {
            return res.status(400).json({message: "Can only review delivered orders"})
        }

        // verify product is in the order
        const productInOrder = order.orderItems.find(
            (item) => item.productId.toString() === productId.toString()
        );

        if (!productInOrder) {
            return res.status(404).json({message: "Product not found in this order"})
        }

        // check if review already exist
        const existingReview = await Review.findOne({ productId, userId: user._id })
        if (existingReview) {
            return res.status(400).json({message: "You have already reviewed this product"})
        }

        // create a review
        const review = await Review.create({
            productId,
            userId: user._id,
            orderId,
            rating
        })

        // update the product rating
        const product = await Product.findById(productId);
        const reviews = await Review.find({ productId });
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        product.averageRating = totalRating / reviews.length;
        product.totalReviews = reviews.length;
        await product.save();

        return res.status(201).json({message: "Review submitted successfully", review})

    } catch (error) {
        console.log('====================================');
        console.log("Error in createReview controller:", error);
        console.log('====================================');
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function deleteReview(req, res) {
    try {
        const { reviewId } = req.params;
        const { user } = req.user;

        const review = await Review.findById({ id })

        if (!review) {
            return res.status(404).json({message: "Review not found"})
        }

        // Are you the owner of the review
        if (review.userId.toString() !== user._id.toString()) {
            return res.status(403).json({message: "Unauthorized"})
        }

        const productId = review.productId;
        await Review.findByIdAndDelete(reviewId);

        // update the product rating
        const reviews = await Review.find({ productId });
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        await Product.findByIdAndUpdate(productId, {
            averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
            totalReviews: reviews.length,
        })

        return res.status(200).json({message: "Review deleted successfully"});
        

    } catch (error) {
        
    }
}

// TODO later
export async function getAllReviews(req, res) {
    try {
        
    } catch (error) {
        
    }
}


export async function updateReview(req, res) {
    try {
        
    } catch (error) {
        
    }
}