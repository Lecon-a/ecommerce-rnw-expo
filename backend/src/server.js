import express from "express";
import path from "path";
import { ENV } from "./config/env.js";


const app = express();

const __dirname = path.resolve();
// const __dirname = path.dirname(new URL(import.meta.url).pathname)

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" });
})

// make our app ready for the deployment 

// if (ENV.MODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../admin/dist")))

//     app.get("/{*any}", (req, res) => {
//         res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
//     })
// }

app.listen(ENV.PORT, () => {
    console.log('====================================');
    console.log("Server is currently running on port 3000");
    console.log('====================================')
})