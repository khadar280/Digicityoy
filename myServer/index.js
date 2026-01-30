import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import BookingRoutes from "./routes/bookings.js";
import OrderRoutes from "./routes/order.js";
import PaymentRoutes from "./routes/payment.js";
import CheckoutRoutes from "./routes/checkout.js";
import AuthRoutes from "./routes/auth.js";
import LaptopRoutes from "./routes/laptop.js";
import ContactRoutes from "./routes/contact.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.digicity.fi",
      "https://digicityoy-mw2scad9z-khadar280s-projects.vercel.app",
    ],
    credentials: true,
  })
);

// API routes
app.use("/api/bookings", BookingRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/laptop", LaptopRoutes);
app.use("/api/contact", ContactRoutes);

// Health check
app.get("/api", (req, res) => {
  res.send("✅ DigiCity API is live");
});

// 404 for API
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
