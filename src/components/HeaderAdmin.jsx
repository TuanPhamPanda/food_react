import React from "react";
import icons from "../ultis/icons";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/taco-logo.png";

const HeaderAdmin = () => {
  const { FaUser } = icons;
  const notActiveStyle =
    "flex gap-[12px] font-bold text-[#32323D] text-[13px] items-center";
  const activeStyle =
    "flex gap-[12px] font-bold text-[#f38609] text-[13px] items-center";
  const menuAdmin = [
    {
      path: "",
      text: "Trang chủ",
      end: true,
    },
    {
      path: "/admin/addFood",
      text: "Thêm sản phẩm",
    },
  ];

  const handleLogOut = () => {
    alert("Logout");
  };

  return (
    <div className="header">
      <div className="">
        <NavLink className="logo flex items-center" to={"/admin/"}>
          <img src={logo} alt="logo" />
          FOOD
        </NavLink>
      </div>
      <nav className="flex">
        {menuAdmin.map((items) => (
          <NavLink
            to={items.path}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
            end={true}
            key={items.path}
          >
            <span className="mx-[10px] hover:text-[#27ae60]">{items.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="flex gap-4">
        <div className="cursor-pointer relative p-10 hover:bg-main-primary-green">
          <div className="nav flex flex-col w-full">
            <span className="p-4">
              <FaUser size={26} />
            </span>
            <ul>
              <li className="flex w-full flex-col text-[13px] justify-end mt">
                <button
                  className="mt-2 p-4 cursor-pointer hover:bg-[#f38609] hover:text-white"
                  onClick={(e) => handleLogOut()}
                >
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
