import Stripe from "stripe";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import { transporter } from "./mailController.js";
export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      session: session.id,
      ticketPrice: doctor.ticketPrice,
    });
    //send mail to user
    const configMail = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Booking Confirmation Email - Medical Booking System",
      text: `Hello ${user.name},\n\nYour booking has been confirmed with ${doctor.name}.\nTicket Price: ${doctor.ticketPrice} USD\nThank you for using our service.\nPlease payment for your appontment\n\nBest Regards,\nMedical Booking System`,
    };
    const sendMailAsync = (config) => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(config, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    };
    const result = await booking.save();
    const ticket = await sendMailAsync(configMail); // Call the sendMailAsync function

    res.status(200).json({ success: true, message: "Success paid", session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
