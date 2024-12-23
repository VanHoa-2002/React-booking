import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: true,
};
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect to DB successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
