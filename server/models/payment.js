import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  createdAt: { default: Date.now, type: Date },
  stripe_payment_intent: String,
  stripe_session_id: String,
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
