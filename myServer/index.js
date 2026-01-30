// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();


import ContactRoutes from "./routes/contact.js";
import OrderRoutes from "./routes/order.js";
import PaymentRoutes from "./routes/payment.js";
import KhadkaRoutes from "./routes/khadka.js";
import CheckoutRoutes from "./routes/checkout.js";
import AuthRoutes from "./routes/auth.js";
import LaptopRoutes from "./routes/laptop.js";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

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

// API routes
app.use("/api/contact", ContactRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/khadk", KhadkaRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/laptop", LaptopRoutes);

// Test API route
app.get("/api", (req, res) => {
  res.send("👋 Welcome to DigiCity API — backend is live!");
});

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// 404 for unknown API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ error: "Route not found!" });
  }
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

// Connect to MongoDB and start server
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