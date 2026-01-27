import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ GET booked times
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const bookings = await Booking.find({
      bookingDate: { $regex: `^${date}` },
    });

    return res.status(200).json(bookings);
  } catch (err) {
    console.error("GET /booking error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ✅ CREATE booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking({
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      phone: req.body.phone,
      service: req.body.service,
      bookingDate: req.body.bookingDate,
      lang: req.body.lang,
    });

    await booking.save();

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("POST /booking error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;