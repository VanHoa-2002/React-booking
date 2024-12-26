import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "./mailController.js";
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
    algorithm: "HS256",
  });
};
export const register = async (req, res) => {
  const { name, email, password, role, photo, gender } = req.body;
  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }
    // check existing user
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        photo,
        gender,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        role,
        photo,
        gender,
      });
    }
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isMatchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "Login successfully",
      token,
      role,
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getOtp = async (req, res) => {
  const { email, otpGender } = req.body;
  try {
    let user = null;
    user = await User.findOne({ email });
    if (!user) {
      user = await Doctor.findOne({ email });
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist", status: false, ok: false });
    }
    // send otp to email
    const configMail = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Verify OTP for your email - Medical Booking System",
      html: `
      <p>Hello ${user.name},</p>
      <p>This is your OTP to reset your password: <strong style="color:blue;">${otpGender}</strong>.</p>
      <p>Thank you for using our service.</p>
      <p>Best Regards,<br />
      Medical Booking System</p>
    `,
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
    const ticket = await sendMailAsync(configMail); // Call the sendMailAsync function
    res
      .status(200)
      .json({ status: true, message: "OTP sent successfully", ticket });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    const updateUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      {
        returnDocument: "after", // Return the updated document
        projection: { password: 0 }, // Exclude the password field from the returned document (optional)
      }
    );

    const token = generateToken(updateUser);
    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "Reset password successfully",
      token,
      role,
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
