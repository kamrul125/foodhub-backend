"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const food_route_1 = __importDefault(require("./modules/food/food.route"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS কনফিগারেশন - আপনার নতুন লিঙ্কটি এখানে বসান
app.use((0, cors_1.default)({
    origin: "https://foodhub-frontend-ochre.vercel.app", // নতুন ওছর (ochre) লিঙ্কটি দিন
    credentials: true
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("FoodHub Server is Running!");
});
app.use("/api", routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/foods", food_route_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
