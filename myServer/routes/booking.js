import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// 🔹 GET booked times
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    // Match bookings for that day (use ISO string YYYY-MM-DD)
    const bookings = await Booking.find({
      bookingDate: { $regex: `^${date}` }, // Matches YYYY-MM-DD prefix
    }).sort({ bookingDate: 1 });

    // Always return array, even if empty
    return res.status(200).json(bookings);
  } catch (err) {
    console.error("GET /booking error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// 🔹 CREATE booking
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate, lang } =
      req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !phone || !service || !bookingDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate bookingDate is a valid date
    const bookingDateObj = new Date(bookingDate);
    if (isNaN(bookingDateObj.getTime())) {
      return res.status(400).json({ error: "Invalid bookingDate" });
    }

    // Save booking to MongoDB
    const booking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate: bookingDateObj,
      lang: lang || "en",
    });

    await booking.save();

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("POST /booking error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;