const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const nodemailer = require("nodemailer");

/* EMAIL */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/* CREATE BOOKING */
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate } = req.body;

    /* VALIDATION */
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
      return res.status(400).json({ error: "Varaukset eivät ole mahdollisia viikonloppuna" });
    }

    /* BUSINESS HOURS */
    const hour = bookingDateObj.getHours();
    if (hour < 11 || hour >= 20) {
      return res.status(400).json({ error: "Varaus ei ole aukioloaikana" });
    }

    /* SLOT CHECK */
    const start = new Date(bookingDateObj);
    const end = new Date(bookingDateObj);
    end.setMinutes(end.getMinutes() + 59);

    const exists = await Booking.findOne({
      bookingDate: { $gte: start, $lt: end },
    });

    if (exists) {
      return res.status(400).json({ error: "Tämä aika on jo varattu" });
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

    /* RESPOND FAST */
    res.status(201).json({
      message: "Varaus tallennettu",
      booking: newBooking,
    });

    /* FORMAT DATE (Finnish) */
    const formattedDate = bookingDateObj.toLocaleString("fi-FI", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    /* ADMIN EMAIL */
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Uusi varaus vastaanotettu",
      html: `
        <h3>Uusi varaus</h3>
        <p><b>Nimi:</b> ${customerName}</p>
        <p><b>Sähköposti:</b> ${customerEmail}</p>
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
        <p>Kiitos varauksestasi! Varaus on nyt vahvistettu.</p>

        <h3>Varauksen tiedot:</h3>
        <p><b>Palvelu:</b> ${service}</p>
        <p><b>Aika:</b> ${formattedDate}</p>

        <p>Jos haluat muuttaa tai peruuttaa varauksen, ota meihin yhteyttä.</p>

        <br/>
        <p>Ystävällisin terveisin,<br/>Yrityksesi</p>
      `,
    };

    /* SEND EMAILS (NON-BLOCKING) */
    Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(customerMail),
    ])
      .then(() => console.log("Sähköpostit lähetetty"))
      .catch((err) => console.error("Sähköposti virhe:", err.message));

  } catch (error) {
    console.error("BOOKING ERROR:", error);
    res.status(500).json({ error: "Palvelinvirhe", details: error.message });
  }
});

module.exports = router;