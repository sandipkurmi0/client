import React, { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";

const Nav: FC = () => {
  const user: any = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();

  const LogoutHandle = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("🦄 You are Logout SuccessFull!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full z-30  py-1 bg-white shadow-lg border-b ">
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
        <div
          className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between gap-4 text-base text-blue-600 pt-4 md:pt-0">
              <li>
                <NavLink to={"/"}>
                  <span className=" hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2">
                    Home
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/about"}>
                  <span className=" hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2">
                    About
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="order-2 md:order-3 flex items-center justify-end mr-0 md:mr-4"
          id="nav-content"
        >
          <div className="auth flex gap-4 items-center w-full md:w-full">
            <span className="rounded-full text-blue-500 bg-gray-200 font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max pl-2">
              <img
                className="rounded-full w-9 h-9 max-w-none"
                alt="A"
                src="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"
              />
              <span className="flex items-center px-3 py-2">{user.name}</span>
              <button className="bg-transparent hover focus:outline-none"></button>
            </span>
            <button
              className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100"
              onClick={LogoutHandle}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
