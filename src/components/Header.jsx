import { React } from "react";
import logo from "../assets/images/taco-logo.png";
import { menuHome } from "../ultis/menus";
import { useNavigate, NavLink } from "react-router-dom";
import path from "../ultis/path";
import icons from "../ultis/icons";

{/* <ul ref={user} className="user absolute top-[100%] right-0 left-0 z-10">
            <li className="flex flex-col py-8 gap-4 min-w-max text-[13px]">
              <NavLink
                to={navigate("/login")}
                className="p-4 cursor-pointer hover:bg-[#f38609]"
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to={navigate("/register")}
                className="p-4 cursor-pointer hover:bg-[#f38609]"
              >
                Đăng ký
              </NavLink>
            </li>
          </ul> */}


const { FaShoppingCart, FaUser } = icons;
const notActiveStyle =
  "flex gap-[12px] font-bold text-[#32323D] text-[13px] items-center";
const activeStyle =
  "flex gap-[12px] font-bold text-[#f38609] text-[13px] items-center";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="">
        <a
          href="/"
          onClick={() => {
            navigate(`/${path.HOME}`);
          }}
          className="logo flex items-center"
        >
          <img src={logo} alt="logo" />
          FOOD
        </a>
      </div>
      <nav className="flex">
        {menuHome.map((items) => (
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
      <div className="flex justify-center items-center gap-4">
        <div
          onClick={() => {
            navigate("/cart");
          }}
          className="hover:bg-[#27ae60] p-4 cursor-pointer"
        >
          <FaShoppingCart size={24} />
        </div>
        <div className="hover:bg-[#27ae60] p-4 cursor-pointer">
          <span className="relative">
            <FaUser size={24} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
