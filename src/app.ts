import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import adminRoutes from "./modules/admin/admin.routes";
import foodRoutes from "./modules/food/food.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

dotenv.config();

const app = express();

// CORS কনফিগারেশন - আপনার নতুন লিঙ্কটি এখানে বসান
app.use(cors({
  origin: "https://foodhub-frontend-ochre.vercel.app", // নতুন ওছর (ochre) লিঙ্কটি দিন
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FoodHub Server is Running!");
});

app.use("/api", routes);
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);

app.use(globalErrorHandler);

export default app;