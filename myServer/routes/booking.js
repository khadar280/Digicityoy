const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const nodemailer = require("nodemailer");
require("dotenv").config();

/* EMAIL TRANSPORTER */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* VERIFY EMAIL CONFIG ON START */
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email config error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

/* GET BOOKINGS */
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      const bookings = await Booking.find().sort({ bookingDate: 1 });
      return res.json(bookings);
    }

    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);

    const bookings = await Booking.find({
      bookingDate: { $gte: start, $lte: end },
    }).sort({ bookingDate: 1 });

    res.json(bookings);
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/* CREATE BOOKING */
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate } = req.body;

    if (!customerName || !customerEmail || !service || !bookingDate) {
      return res.status(400).json({ error: "Pakollisia kenttiä puuttuu" });
    }

    const bookingDateObj = new Date(bookingDate);

    if (isNaN(bookingDateObj)) {
      return res.status(400).json({ error: "Virheellinen päivämäärä" });
    }

    /* WEEKEND BLOCK */
    const day = bookingDateObj.getDay();
    if (day === 0 || day === 6) {
      return res.status(400).json({ error: "Ei varauksia viikonloppuna" });
    }

    /* BUSINESS HOURS */
    const hour = bookingDateObj.getHours();
    if (hour < 11 || hour >= 20) {
      return res.status(400).json({ error: "Ei aukioloaikana" });
    }

    /* SLOT CHECK */
    const start = new Date(bookingDateObj);
    const end = new Date(bookingDateObj);
    end.setMinutes(end.getMinutes() + 59);

    const exists = await Booking.findOne({
      bookingDate: { $gte: start, $lt: end },
    });

    if (exists) {
      return res.status(400).json({ error: "Aika jo varattu" });
    }

    /* SAVE BOOKING */
    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate: bookingDateObj,
    });

    await newBooking.save();

    /* FORMAT DATE */
    const formattedDate = bookingDateObj.toLocaleString("fi-FI", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    /* ADMIN EMAIL (YOU RECEIVE THIS) */
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // your inbox
      replyTo: customerEmail,
      subject: "📥 Uusi varaus",
      html: `
        <h2>Uusi varaus</h2>
        <hr/>
        <p><b>Nimi:</b> ${customerName}</p>
        <p><b>Email:</b> ${customerEmail}</p>
        <p><b>Puhelin:</b> ${phone || "Ei annettu"}</p>
        <p><b>Palvelu:</b> ${service}</p>
        <p><b>Aika:</b> ${formattedDate}</p>
      `,
    };

    /* CUSTOMER EMAIL */
    const customerMail = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: "Varausvahvistus",
      html: `
        <h2>Varaus vahvistettu ✅</h2>
        <p>Hei ${customerName},</p>
        <p>Kiitos varauksestasi!</p>

        <p><b>Palvelu:</b> ${service}</p>
        <p><b>Aika:</b> ${formattedDate}</p>

        <br/>
        <p>Ystävällisin terveisin,<br/>Digicity</p>
      `,
    };

    /* SEND EMAILS (IMPORTANT: await) */
    try {
      const info = await Promise.all([
        transporter.sendMail(adminMail),
        transporter.sendMail(customerMail),
      ]);

      console.log("✅ Emails sent:", info);
    } catch (emailError) {
      console.error("❌ EMAIL ERROR:", emailError);
    }

    /* RESPONSE */
    res.status(201).json({
      message: "Varaus tallennettu ja sähköposti lähetetty",
      booking: newBooking,
    });

  } catch (error) {
    console.error("BOOKING ERROR:", error);
    res.status(500).json({ error: "Palvelinvirhe" });
  }
});

module.exports = router;