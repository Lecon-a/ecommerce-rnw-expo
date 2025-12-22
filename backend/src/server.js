import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js"

import adminRouter from "./routes/admin.route.js";

const app = express();

const __dirname = path.resolve();
app.use(express.json());
app.use(clerkMiddleware()); // check for authentication
app.use("/api/inngest", serve({client: inngest, functions}))
app.use("/api/admin", adminRouter)

app.get("/api/health", (_, res) => {
    res.status(200).json({ message: "Success" });
})

// make our app ready for the deployment 
if (ENV.MODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../admin/dist")))

    app.get("/{*any}", (req, res) => {
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
