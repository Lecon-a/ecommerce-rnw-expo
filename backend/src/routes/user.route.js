import { Router } from "express";
import {
    addAddress,
    updateAddress,
    getAddresses,
    deleteAddress,
    addToWishlist,
    getWishlist,
    removeFromWishlist
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
 
const userRouter = Router();

userRouter.use(protectRoute)
// address route 
userRouter.post("/addresses", addAddress)
userRouter.get("/addresses", getAddresses)
userRouter.put("/addresses/:addressId", updateAddress)
userRouter.delete("/addresses/:addressId", deleteAddress)

// wishlist route
userRouter.post("/wishlist", addToWishlist)
userRouter.get("/wishlist", getWishlist)
userRouter.delete("/wishlist/:productId", removeFromWishlist)

export default userRouter;