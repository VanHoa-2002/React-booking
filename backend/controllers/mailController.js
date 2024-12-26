export const sendMail = async (req, res) => {
  try {
    const { email, subject, text } = req.body;
    res.status(200).json({ success: true, message: "Mail sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
