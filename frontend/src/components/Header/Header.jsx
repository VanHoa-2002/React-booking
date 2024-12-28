import React, { useContext, useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { authContext } from "../../context/AuthContext";
import { defaultImg } from "../../config";
import { useState } from "react";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctors",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contacts",
  },
];
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { user, role, token, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setDropdownVisible(false);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    });
  };
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle("show__menu");
  };
  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* logo */}
          <div>
            <img src={logo} alt="" />
          </div>
          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500]"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* nav right */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <div
                  onMouseEnter={() => setDropdownVisible(true)}
                  onMouseLeave={() => setDropdownVisible(false)}
                  className="relative"
                >
                  <div className="flex items-center gap-2">
                    <figure className="w-[35px] h-[35px] rounded-full">
                      <img
                        src={user?.photo ? user?.photo : defaultImg}
                        className="aspect-square rounded-full object-cover"
                        alt=""
                        onError={(e) => {
                          console.log(e);

                          e.target.src = defaultImg;
                        }}
                      />
                    </figure>
                    <h2 className="text-mdd font-medium text-headingColor">
                      {user.name}
                    </h2>
                  </div>
                  {isDropdownVisible && (
                    <div
                      id="dropdownHover"
                      className="absolute z-10 bg-white divide-y divide-gray-100 rounded-sm shadow w-28 dark:bg-gray-700 top-[85px]"
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownHoverButton"
                      >
                        {role === "admin" && (
                          <Link to={"/admin/management"}>
                            <li>
                              <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Management
                              </span>
                            </li>
                          </Link>
                        )}
                        {role !== "admin" && (
                          <Link
                            to={`${
                              role === "doctor"
                                ? "/doctor/profile/me"
                                : "/users/profile/me"
                            }`}
                          >
                            <li>
                              <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Profile
                              </span>
                            </li>
                          </Link>
                        )}
                        <li className="cursor-pointer">
                          <a
                            onClick={() => {
                              handleLogout();
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer"></BiMenu>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
