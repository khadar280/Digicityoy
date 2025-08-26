import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

// ✅ Setup CORS
const allowedOrigins = [
  "https://digicityoy-mw2scad9z-khadar280s-projects.vercel.app", // Vercel frontend
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

// ✅ Your routes
app.use("/api/contact", ContactRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/booking", BookingRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/laptop", LaptopRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("👋 Welcome to DigiCity API — backend is live!");
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found!" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
