import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied, token must be provided",
    });
  }
  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access denied, token expired",
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user;
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);
  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  if (!roles.includes(user.role)) {
    return res.status(401).json({
      success: false,
      message: "Access denied, you are not authorized to access this route",
    });
  }
  next();
};
