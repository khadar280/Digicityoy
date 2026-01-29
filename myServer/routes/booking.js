// server/routes/booking.js
import express from "express";
import Booking from "../models/booking.js"; 

const router = express.Router();

// GET booked times by date
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const bookings = await Booking.find({
      bookingDate: { $gte: new Date(`${date}T00:00:00.000Z`), $lt: new Date(`${date}T23:59:59.999Z`) },
    });

    return res.status(200).json(bookings);
  } catch (err) {
    console.error("GET /booking error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate, lang } = req.body;

    console.log("POST /booking body:", req.body); 

    if (!customerName || !customerEmail || !phone || !service || !bookingDate)
      return res.status(400).json({ error: "All fields are required" });

    const bookingDateObj = new Date(bookingDate);
    if (isNaN(bookingDateObj.getTime()))
      return res.status(400).json({ error: "Invalid bookingDate" });

    const booking = new Booking({ customerName, customerEmail, phone, service, bookingDate: bookingDateObj, lang });
    await booking.save();

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("POST /booking error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;