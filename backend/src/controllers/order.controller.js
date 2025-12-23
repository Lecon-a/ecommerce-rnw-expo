import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";


export async function createOrder(req, res) {
    const session = await Product.startSession();
    session.startTransaction();
    try {
        const { orderItems, shippingAddress, paymentResult, totalPrice } = req.body;
        const user = req.user;

        if (!orderItems || orderItems.length === 0) {
            session.startTransaction();
            session.endSession();
            return res.status(400).json({ message: "No order items" })
        }
        
        // validate products and stock
        for (const item of orderItems) {
            // TODO: verify if this is actually works
            const product = await Product.findById(item.product._id).session(session);

            if (!product) {
                session.startTransaction();
                session.endSession();
                return res.status(404).json({message: `Product ${item.name} not found`})
            }

            if (product.stock < item.quantity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({message: `Insufficient stock for ${product.name}`})
            }
        }

        const order = await Order.create([{
            user: user._id,
            clerkId: user.clerkId,
            orderItems,
            shippingAddress,
            paymentResult,
            totalPrice
        }], { session })

        // update product stock
        for (const item of orderItems) {
            // TODO: verify if this is actually works
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: - item.quantity },
            }, { session } );
        }

        await session.abortTransaction();
        session.endSession();
        res.status(201).json({ message: "Order created successfully", order })

    } catch (error) {
        console.log('====================================');
        console.log("Error in createOrder controller: ", error);
        res.status(500).json({ error: "Internal server erro" });
        console.log('====================================');
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getUserOrders(req, res) { 
    try {
        const user = req.user;

        const orders = await Order.find({ clerkId: user.clerkId }).populate("orderItems.product").sort({ createdAt: -1 })

        // fetch all reviews for these orders in bulk
        const orderIds = orders.map((order) => order._id);
        const reviews = await Review.find({ orderId: { $in: orderIds } });
        const reviewedOrderIds = new Set(reviews.map((review) => review.orderId.toString()));

        const ordersWithReviewStatus = await Promise.all(
            orders.map(async (order) => {
                return {
                    ...order.toObject(),
                    hasReviewed: reviewedOrderIds.has(order._id.toString()),
                };
            })
        );

        return res.status(200).json({ orders: ordersWithReviewStatus })
    } catch (error) {
        console.log('====================================');
        console.log("Error in getUserOrders controller: ", error);
        res.status(500).json({ error: "Internal server erro" });
        console.log('====================================');
        res.status(500).json({ message: "Internal server error" })
    }
}