import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import jwt from "jsonwebtoken";
export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updateDoctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: updateDoctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Delete doctor account successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Doctor found successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    const token = req.header("authorization");
    const { role } = jwt.decode(token.split("Bearer ")[1]);
    let doctors;
    if (role === "admin") {
      doctors = await Doctor.find().select("-password");
    } else if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          {
            name: { $regex: query, $options: "i" }, // i for case insensitive (upper case or lower case)
          },
          {
            specialization: { $regex: query, $options: "i" }, // i for case insensitive (upper case or lower case)
          },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    res.status(200).json({
      success: true,
      message: "Doctor found successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      success: true,
      message: "Doctor profile found successfully",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
