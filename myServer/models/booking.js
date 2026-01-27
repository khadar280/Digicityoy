import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  lang: { type: String, default: "en" },
});

export default mongoose.model("Booking", BookingSchema);