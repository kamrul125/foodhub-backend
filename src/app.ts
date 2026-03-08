import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import adminRoutes from "./modules/admin/admin.routes";
import foodRoutes from "./modules/food/food.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://foodhub-frontend-ochre.vercel.app" //  লাইভ ফ্রন্টএন্ড লিঙ্ক
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ২. JSON ডাটা পড়ার জন্য মিডলওয়্যার
app.use(express.json());

// ৩. সার্ভার চেক করার জন্য বেস রুট
app.get("/", (req, res) => {
  res.send({
    message: "FoodHub Server is Running!",
    status: "Healthy"
  });
});

// ৪. এপিআই রাউটস
app.use("/api", routes); 
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);

// ৫. গ্লোবাল এরর হ্যান্ডলার
app.use(globalErrorHandler);

export default app;