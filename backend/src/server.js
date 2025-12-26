import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";

import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";

const app = express();

const __dirname = path.resolve();
app.use(express.json());
app.use(clerkMiddleware()); // check for authentication
app.use(cors({origin: ENV.CLIENT_URL, Credential: true}));
app.use("/api/inngest", serve({client: inngest, functions}))
app.use("/api/admin", adminRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.get("/api/health", (_, res) => {
    res.status(200).json({ message: "Success" });
})

// make our app ready for the deployment 
if (ENV.MODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../admin/dist")))

    app.get("/{*any}", (_, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    })
}

const startServer = async () => {
    await connectDB();
    app.listen(ENV.PORT, () => {
        console.log('====================================');
        console.log("Server is currently running on port 3000");
        console.log('====================================')
    })
};

startServer();
