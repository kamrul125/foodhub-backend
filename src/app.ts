import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import adminRoutes from "./modules/admin/admin.routes";
import foodRoutes from "./modules/food/food.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

dotenv.config();

const app = express();

// CORS কনফিগারেশন আপডেট করা হয়েছে
app.use(cors({
  origin: "https://foodhub-frontend-gamma.vercel.app", // আপনার ফ্রন্টএন্ড লিঙ্ক
  credentials: true
}));

app.use(express.json());

// রুট পাথ চেক করার জন্য একটি সিম্পল রাউট (ঐচ্ছিক)
app.get("/", (req, res) => {
  res.send("FoodHub Server is Running!");
});

app.use("/api", routes);
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);

// গ্লোবাল এরর হ্যান্ডলার সবসময় সবার শেষে থাকে
app.use(globalErrorHandler);

export default app;