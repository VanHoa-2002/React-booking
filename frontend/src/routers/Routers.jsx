import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetail from "../pages/Doctors/DoctorDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Notfound from "../pages/Notfound";
import MyAccount from "../dashboard/user-account/MyAccount";
import Dashboard from "../dashboard/doctor-account/Dashboard";
import ProtectedRouter from "./ProtectedRouter";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Mail from "../components/Mail/Mail";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/doctors" element={<Doctors />}></Route>
      <Route path="/doctors/:id" element={<DoctorDetail />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Signup />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
      <Route path="/mail" element={<Mail />}></Route>
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRouter allowedRoles={["patient"]}>
            <MyAccount />{" "}
          </ProtectedRouter>
        }
      ></Route>
      <Route
        path="/doctor/profile/me"
        element={
          <ProtectedRouter allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRouter>
        }
      ></Route>
      <Route path="*" element={<Notfound />}></Route>
    </Routes>
  );
};

export default Routers;
