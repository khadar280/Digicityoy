import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 🔹 Load env variables
dotenv.config();

import ContactRoutes from "./routes/contact.js";
import OrderRoutes from "./routes/order.js";
import PaymentRoutes from "./routes/payment.js";
import BookingRoutes from "./routes/booking.js";
import CheckoutRoutes from "./routes/checkout.js";
import AuthRoutes from "./routes/auth.js";
import LaptopRoutes from "./routes/laptop.js";

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 Middleware
app.use(express.json());

// 🔹 CORS setup
const allowedOrigins = [
  "https://digicityoy-mw2scad9z-khadar280s-projects.vercel.app",
  "https://www.digicity.fi",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// 🔹 Routes
app.use("/api/Contact", ContactRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/booking", BookingRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/laptop", LaptopRoutes);

// 🔹 Root route (Render health check)
app.get("/", (req, res) => {
  res.send("👋 Welcome to DigiCity API — backend is live!");
});

// 🔹 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found!" });
});

// 🔹 Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({ error: "Something went wrong!" });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });