import React, { useContext, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext";

const Contact = () => {
  const { user } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    subject: "",
    message: "",
  });
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.subject || !formData.message) {
        return toast.warning("Please fill in all fields before submitting.");
      }
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contact/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("token")
            .replace(/"/g, "")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        throw new Error(data.message);
      }
      setLoading(false);
      toast.success(
        "Thank you for contacting us. We will get back to you soon."
      );
      setFormData({ email: user?.email || "", subject: "", message: "" });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue or have a question? We are here to help you.
        </p>
        <form onSubmit={(event) => handleSubmit(event)} className="space-y-8">
          <div>
            <label htmlFor="" className="form__label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form__input mt-1"
              value={formData.email || ""}
              onChange={handleFormChange}
              name="email"
            />
          </div>
          <div>
            <label htmlFor="" className="form__label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              className="form__input mt-1"
              value={formData.subject || ""}
              onChange={handleFormChange}
              name="subject"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="" className="form__label">
              Your Message
            </label>
            <textarea
              rows={6}
              type="text"
              id="message"
              placeholder="Leave a comment..."
              className="form__input mt-1"
              value={formData.message || ""}
              onChange={handleFormChange}
              name="message"
            />
          </div>
          <button
            type="submit"
            className="btn rounded sm:w-fit flex items-center"
          >
            {loading ? (
              <HashLoader color="#fff" loading={loading} size={20} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
