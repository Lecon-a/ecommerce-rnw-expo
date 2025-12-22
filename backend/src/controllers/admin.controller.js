import cloudinary from "../config/cloudinary.js"
import { Product }  from "../models/product.model.js"
import { Order } from "../models/order.model.js"
import { User } from "../models/user.model.js"

export async function createProduct(req, res) {
    try {
        // get all the fields from the frontend
        const { name, description, price, stock, category } = req.body;

        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({message: "All fields are required"})
        }

        if (!req.files || req.files.length === 0) {
           return res.status(400).json({message: "At least one image is required"}) 
        }

        if (req.files.length > 3) {
            return res.status(400).json({ message: "Maximum 3 images allowed"})
        }

        // upload to cloudinary
        const uploadPromises = req.files.map((file) => {
            return cloudinary.uploader.upload(file.path, {
                folder: "products"
            })
        });

        const uploadResults = await Promise.all(uploadPromises);

        const imageUrls = uploadResults.map((result) => result.secure_url);
        
        // create the product
        const product = await Product.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
            images: imageUrls
        })

        res.status(201).json(product)

    } catch (error) {
        console.log('====================================');
        console.log("Error creating product", error);
        console.log('====================================');
        res.status(500).json({message: "Internal server error"})
    }
}
export async function getAllProducts(_, res) {
    try {
        // -1 means in desc order or most recent products first
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(201).json(products);
    } catch (error) {
        console.log('====================================');
        console.log("Error fetching products", error);
        console.log('====================================');
        res.status(500).json({message: "Internal server error"})
    }
}
export async function updateProduct(req, res) {
    try {
        const { id } = req.params 
        const { name, description, price, stock, category } = req.body;

        const product = await Product.findById({ id })
        
        if (!product) return res.status(404).json({ message: "Product not found" })
        
        if (name) product.name = name;
        if (description) product.description = description;
        if (price !== undefined) product.price = parseFloat(price);
        if (stock !== undefined) product.stock = parseInt(stock);
        if (category) product.category = category;

        // handle image updates if new images are uploaded
        if (req.files && req.files.length > 0) {
            if (req.files.length > 3) return res.status(400).json({ message: "Maximum 3 images allowed" });

            const uploadPromises = req.files.map((file) => {
                return cloudinary.uploader.upload(file.path, {
                    folder: "products"
                })
            });

            const uploadResults = await Promise.all(uploadPromises);
            product.images = uploadResults.map((result) => result.secure_url);
        }

        await product.save();
        res.status(201).json(product);

    } catch (error) {
        console.log('====================================');
        console.log("Error updating product", error);
        console.log('====================================');
        res.status(500).json({message: "Internal server error"})
    }
}

export const getAllOrders = async (_, res) => {
    try {
        const orders = await Order.find()
            .populate("userId", "name email")
            .populate("orderItems.productId")
            .sort({ createdAt: -1 });
        ``
        res.status(200).json({ orders })

    } catch (error) {
        console.log('====================================');
        console.log("Error in getAllOrders controller:", error);
        console.log('====================================');
        res.status(500).json({message: "Internal server error"})
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!["pending", "shipped", "delivered"].includes(status)) return res.status(400).json({ message: "Invalid status" });

        const order = await Order.findById({ orderId });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        order.status = status
        
        if (status === "shipped" && !order.shippedAt) {
            order.shippedAt = new Date();
        }

        if (status === "delivered" && !order.deliveredAt) {
            order.deliveredAt = new Date();
        }

        await order.save();
        res.status(200).json({ message: "Order status updated successfully", order });
            
    } catch (error) {
        console.log('====================================');
        console.log("Error in updateOrderStatus controller:", error);
        console.log('====================================');
        res.status(500).json({message: "Internal server error"})
    }
}

export const getAllCustomers = async (_, res) => {
    try {
        const customers = await User.find().sort({ createdAt: -1 })
        res.status(200).json({customers});
    } catch (error) {
        console.log('====================================');
        console.log("Error fetching customers");
        console.log('====================================');
        res.status(500).json({message: "Internal server error"})
    }
}

export const getDashboardStats = async (_, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: {$sum: "$totalPrice"},   
                }
            }
        ])

        const totalRevenue = revenueResult[0]?.total || 0;
        const totalCustomers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            totalOrders,
            totalRevenue,
            totalCustomers,
            totalProducts
        })
    } catch (error) {
        console.log('====================================');
        console.log("Error fetching dashboard stats", error);
        console.log('====================================');
        res.status(500).json({ message: "Internal server error" });
    }
}