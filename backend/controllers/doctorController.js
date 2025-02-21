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
    const appointments = await Booking.find({ doctor: id });
    res.status(200).json({
      success: true,
      message: "Doctor found successfully",
      data: { ...doctor._doc, appointments },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllDoctors = async (req, res) => {
  try {
    const perPage = Number.parseInt(req.query.perPage) || 10;
    const page = Number.parseInt(req.query.page) || 1;
    const { query, typeDisease } = req.query; // Lấy typeDisease từ query params
    const count = await Doctor.countDocuments();
    const pageCount = Math.ceil(count / perPage);
    const token = req.header("authorization")?.split("Bearer ")[1];
    const { role } =
      token && token !== "null" ? jwt.decode(token) : { role: "notAuthorize" };

    let filter = { isApproved: "approved" };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ];
    }

    if (typeDisease) {
      const diseases = typeDisease.split(","); // Cho phép lọc nhiều loại bệnh bằng dấu phẩy
      filter.typeDisease = { $in: diseases };
    }

    let doctors;
    if (role === "admin" && !query && !typeDisease) {
      doctors = await Doctor.find()
        .skip(perPage * (page - 1))
        .limit(perPage)
        .select("-password");
    } else {
      doctors = await Doctor.find(filter)
        .skip(perPage * (page - 1))
        .limit(perPage)
        .select("-password");
    }

    res.status(200).json({
      success: true,
      message: "Doctor found successfully",
      data: doctors,
      pagination: { perPage, pageCount, page },
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
