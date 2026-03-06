import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import adminRoutes from "./modules/admin/admin.routes";
import foodRoutes from "./modules/food/food.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);
app.use(globalErrorHandler);

export default app;