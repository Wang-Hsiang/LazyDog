import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/testRouter.js";
import pool from "./config/mysql.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// import courseRoutes from "./routes/courseRoutes.js";
import articlesRoutes from "./routes/articleRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use("/auth", authRouter);
app.use("/api/hotels", hotelRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/products", productRoutes);
// app.use("/api", courseRoutes);
app.use("/api/articles", articlesRoutes);

app.get("/", (req, res) => {
  res.json({ status: "success", data: null, message: "首頁" });
});

(async () => {
  try {
    // await pool.query();

    console.log("資料庫已連接");

    app.listen(5000, () => {
      console.log("服務啟動於 http://localhost:5000");
    });
  } catch (err) {
    console.error("無法啟動伺服器，資料庫連接失敗:", err);
  }
})();
