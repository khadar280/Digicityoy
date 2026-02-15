router.post('/', async (req, res) => {
  const { customerName, customerEmail, phone, service, bookingDate } = req.body;

  if (!customerName || !customerEmail || !bookingDate || !service) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate,
    });

    await newBooking.save();

    // Optional: wrap email in try/catch
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Booking',
        html: `<p>${customerName} booked ${service} at ${bookingDate}</p>`,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({ message: 'Booking created successfully!' });
  } catch (err) {
    console.error('Booking creation failed:', err); // logs full error
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
  }
});
