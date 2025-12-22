import { Router } from "express";
import {
    createProduct,
    getAllProducts,
    updateProduct,
    getAllOrders,
    updateOrderStatus,
    getAllCustomers,
    getDashboardStats
} from "../controllers/admin.controller.js";
import { adminOnly, protecteRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const adminRouter = Router();

// optimization - DRY
// this runs before the another route 
adminRouter.use(protecteRoute, adminOnly)
// upload.array(key, max_image) - key would be used at the frontend
adminRouter.post("/products", upload.array("images", 3), createProduct)
adminRouter.get("/products", getAllProducts)
adminRouter.put("/products/:id", upload.array("images", 3), updateProduct)

adminRouter.get("/orders", getAllOrders)
adminRouter.patch("/orders/:orderId/status", updateOrderStatus)

adminRouter.get("/customers", getAllCustomers)
adminRouter.get("/stats", getDashboardStats)

export default adminRouter;