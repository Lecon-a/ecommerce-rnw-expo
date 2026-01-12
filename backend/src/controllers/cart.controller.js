import { Cart } from "../models/cart.model.js"
import { Product } from "../models/product.model.js"

export async function getCart(req, res) {
    try {
        const user = req.user;
        let cart = await Cart.findOne({ clerkId: user._id }).populate("items.product");

        if (!cart) {
            cart = Cart.create({
                user: user._id,
                clerkId: user.clerkId,
                items: [],
            });
        }

        res.status(200).json({ cart })
    } catch (error) {
        console.log('====================================');
        console.log("Error fetching cart:", error);
        console.log('====================================');
        return res.status(500).json({message: "Internal server error"})
    }
}

export async function addToCart(req, res) {
    try {
        const user = req.user;
        const { productId, quantity = 1 } = req.body;
        // validate product exists and has stock
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({message: "Insufficient stock"})
        }

        let cart = await Cart.findOne({ clerkId: user.clerkId })
        
        if (!cart) {
            cart = await Cart.create({
                userId: user._id,
                clerkId: user.clerkId,
                items: [],
            });
        }

        // Check if item already in the cart
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
            // increment quantity by 1
            const newQuantity = existingItem.quantity + 1;
            if (product.stock < newQuantity) {
                return res.status(400).json({message: "Insufficient stock"})
            }
            existingItem.quantity = newQuantity;
        } else {
            // add new item
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        return res.status(200).json({ message: "Item added to cart", cart });
        
    } catch (error) {
        console.log('====================================');
        console.log("Error in addToCart controller:", error);
        console.log('====================================');
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function updateCartItem(req, res) {
    try {
        const { productId } = req.params;
        const user = req.user;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const cart = await Cart.findOne({ clerkId: user.clerkId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // check if product exist and validate stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ message: "Cart updated successfully", cart });

    } catch (error) {
        console.log('====================================');
        console.log("Error in addToCart controller:", error);
        console.log('====================================');
        res.status(500).json({message: "Internal server error"});
    }
}

export async function removeFromCart(req, res) {
    try {
        const { productId } = req.params;
        const user = req.user;
        const cart = await Cart.findOne({ clerkId: user.clerkId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);


    } catch (error) {
        console.log('====================================');
        console.log("Error in removeFromCart controller:", error);
        console.log('====================================');
        res.status(500).json({message: "Internal server error"});
    }
}

export async function clearCart(req, res) {
    try {
        const cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        return res.status(200).json({message: "Cart cleared", cart})
    } catch (error) {
        console.log('====================================');
        console.log("Error in clearCart controller:", error);
        console.log('====================================');
        res.status(500).json({message: "Internal server error"});
    }
}