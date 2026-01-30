import express from "express";
import Booking from "../models/booking.js";

const router = express.Router();

/
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    const bookings = await Booking.find({
      bookingDate: { $gte: start, $lte: end },
    });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/bookings
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate,
      lang,
    } = req.body;

    if (!customerName || !customerEmail || !phone || !service || !bookingDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const booking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate: new Date(bookingDate),
      lang,
    });

    await booking.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
