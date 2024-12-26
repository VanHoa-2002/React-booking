import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
export const sendMail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const mailConfigAdmin = {
      from: email,
      to: process.env.SMTP_USER,
      subject: subject,
      text: message,
    };
    const mailConfigGuess = {
      from: process.env.SMTP_USER,
      to: email,
      subject: process.env.MAIL_GUESS_HEADER,
      html: `
      <p>Thank you for contact with us</p>
      <p>We’ve received your request and our team is currently reviewing it. We will contact you shortly with an update.<br /> Please don’t hesitate to let us know if you have any additional questions or information to provide in the meantime.<br /> We appreciate your patience and look forward to assisting you.</p>
      <p>Best Regards,<br />
      Medical Booking System</p>
    `,
    };
    // Convert sendMail to a Promise
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
    const info = await sendMailAsync(mailConfigAdmin); // Call the sendMailAsync function
    const infoGuess = await sendMailAsync(mailConfigGuess);
    console.log("Email sent: " + info.response);
    console.log("Email Guess sent: " + infoGuess.response);

    res.status(200).json({ success: true, message: "Mail sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
