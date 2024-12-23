import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js ";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};
export const register = async (req, res) => {
  const { name, email, password, role, photo, gender } = req.body;
  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "admin") {
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
      });
    }
    if (role === "admin") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        role,
        photo,
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
    const { password: userPassword, ...others } = user._doc;
    res.status(200).json({ status: true, token, role, data: { ...others } });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
