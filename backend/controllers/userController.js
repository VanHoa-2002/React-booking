import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User delete successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const users = await User.findById(userId);
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = users._doc;
    res.status(200).json({
      success: true,
      message: "User profile found successfully",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    //step 1: retrieve appointments from booking for the specific user
    const bookings = await Booking.find({ user: req.userId });
    //step 2: extract doctor id from the bookings
    const doctorIds = bookings.map((booking) => booking.doctor.id);
    //step 3: retrieve doctor details from the doctor collection
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Appointments found successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
