import React from "react";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import { RiLinkedinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const socialLists = [
  {
    path: "https://www.instagram.com/",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.github.com/",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.linkedin.com/",
    icon: (
      <RiLinkedinFill
        className="group-hover:text-white
    w-4 h-5"
      />
    ),
  },
  {
    path: "https://www.youtube.com/",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
];
const quickLinksFirst = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/blog",
    display: "Blog",
  },
];
const quickLinksSecond = [
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  {
    path: "/doctors",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get a Opinion",
  },
];
const quickLinksThird = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
  {
    path: "/policy",
    display: "Privacy Policy",
  },
];
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-16 pt-10">
      <div className="container border-t border-solid border-[#dbdbdb] pt-5">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright © {year} developed by Hoa Dev all rights reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLists.map((item, index) => {
                return (
                  <Link
                    to={item.path}
                    key={index}
                    target="_blank"
                    className="w-9 h-9 border border-solid border-[#181a1e] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    {item.icon}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {quickLinksFirst.map((link, index) => (
                <li className="mb-4" key={index}>
                  <Link
                    to={link.path}
                    className="text-[16px] leading-7 font-[400]"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              I want to:
            </h2>
            <ul>
              {quickLinksSecond.map((link, index) => (
                <li className="mb-4" key={index}>
                  <Link
                    to={link.path}
                    className="text-[16px] leading-7 font-[400]"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Support
            </h2>
            <ul>
              {quickLinksThird.map((link, index) => (
                <li className="mb-4" key={index}>
                  <Link
                    to={link.path}
                    className="text-[16px] leading-7 font-[400]"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
