import { React, useState } from "react";
import logo from "../assets/images/taco-logo.png";
import { menuHome } from "../ultis/menus";
import { useNavigate, NavLink } from "react-router-dom";
import { path } from "../ultis/path";
import icons from "../ultis/icons";
import { logoutAccount } from "../apis";

const { FaShoppingCart, FaUser } = icons;
const notActiveStyle =
  "flex gap-[12px] font-bold text-[#32323D] text-[13px] items-center";
const activeStyle =
  "flex gap-[12px] font-bold text-[#f38609] text-[13px] items-center";

function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser) {
      return localStorageUser;
    } else {
      return null;
    }
  });

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
      <div className="flex gap-4">
        <div
          onClick={() => {
            navigate("/cart");
          }}
          className="hover:bg-main-primary-green p-4 cursor-pointer"
        >
          <FaShoppingCart size={24} />
        </div>

        <div className="cursor-pointer relative p-10 hover:bg-main-primary-green">
          <div className="nav flex flex-col w-full">
            <span className="p-4 ">
              <FaUser size={26} />
            </span>

            <ul>
              {user === null ? (
                <li className="flex w-full flex-col text-[13px] justify-end">
                  <NavLink
                    to={"/login"}
                    className="mt-2 p-4 cursor-pointer hover:bg-[#f38609]"
                  >
                    Đăng nhập
                  </NavLink>
                  <NavLink
                    to={"/register"}
                    className="p-4 cursor-pointer hover:bg-[#f38609]"
                  >
                    Đăng ký
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="flex w-full flex-col text-[13px] justify-end">
                    <span className="mt-2 p-4 cursor-pointer hover:bg-[#f38609]">
                      {user.user_name}
                    </span>

                    <span
                      onClick={() => navigate("/change-password")}
                      className="mt-2 p-4 cursor-pointer hover:bg-[#f38609]"
                    >
                      Đổi mật khẩu
                    </span>

                    <span
                      onClick={() => {
                        const formData = { user_id : user.user_id };

                        logoutAccount(formData)
                          .then((reponse) => {
                            if (reponse.status === 200) {
                              localStorage.removeItem("user");
                              setUser(null);
                              navigate("/");
                            }
                          })
                          .catch((err) => console.log(err));
                      }}
                      className="mt-2 p-4 cursor-pointer hover:bg-[#f38609]"
                    >
                      Đăng xuẩt
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
