import React from "react";
import { NavLink } from "react-router-dom";
import path from "../../ultis/path";
import home_img from "../../assets/images/banhmi/banhmi4.jpg";
import home_parallax_img from "../../assets/images/a.png";
import banner1 from "../../assets/images/banhmi/banhmi4.png";
import home_about from "../../assets/images/mav.png";
import chuyen_phat_nhanh from "../../assets/images/serv-1.png";
import thuc_an_sach from "../../assets/images/serv-2.png";
import chat_luong_tot from "../../assets/images/serv-3.png";
import ho_tro_24_7 from "../../assets/images/serv-4.png";
import { menuFood } from "../../ultis/menus";

const Home = () => {
  return (
    <div className="">
      <div className="home-main">
        <div className="content">
          <span>CHÀO MỪNG</span>
          <h3>Nhà Hàng Món Ăn Việt 😋</h3>
          <p>
            Chúng Tôi Đảm Bảo Sử Dụng Thực Phẩm Tươi Sống Với Chất Lượng Tốt
            Nhất. Thực Khách Sẽ Được Thưởng Thức Ẩm Thực Mexico Với Hương Vị
            Bùng Nổ, Tinh Tế.
          </p>
          <NavLink className="btn text-center" to={path.MENU}>
            Đặt hàng ngay
          </NavLink>
        </div>
        <div className="image">
          <img src={home_img} alt="home-img" className="home-img" />
          <img
            src={home_parallax_img}
            alt="home-parallax-img"
            className="home-parallax-img"
          />
        </div>
      </div>

      <div className="home-category justify-center items-center">
        {menuFood.filter(item => item.text !== "All").map((item =>
          <NavLink
            to={`menu/${item.path}`}
            className="box text-center flex flex-col"
            key={item.path}
          >
            <img src={item.image} alt={item.text} />
            <h3 className="pt-4">{item.text}</h3>
          </NavLink>
        ))}
      </div>

      <div className="home-banner flex justify-center">
        <div className="mx-4 px-4 py-10">
          <div className="flex relative">
            <img
              src={banner1}
              alt="banh-mì"
              className="hover:scale-[2] hover:pr-24 w-[60%]"
            />
            <div className="flex absolute flex-col gap-6 right-0 text-end placeholder-inherit">
              <span className="text-[20px]">special offer</span>
              <h3 className="text-[24px]">upto 50% off</h3>
            </div>
          </div>
        </div>

        <div className="mx-4 px-4 py-10">
          <div className="flex relative">
            <img
              src={banner1}
              alt="banh-mì"
              className="hover:scale-[2] hover:pr-24 w-[60%]"
            />
            <div className="flex absolute flex-col gap-6 right-0 text-end placeholder-inherit">
              <span className="text-[20px]">special offer</span>
              <h3 className="text-[24px]">upto 50% off</h3>
            </div>
          </div>
        </div>

        <div className="mx-4 px-4 py-10">
          <div className="flex relative">
            <img
              src={banner1}
              alt="banh-mì"
              className="hover:scale-[2] hover:pr-24 w-[60%]"
            />
            <div className="flex absolute flex-col gap-6 right-0 text-end placeholder-inherit">
              <span className="text-[20px]">special offer</span>
              <h3 className="text-[24px]">upto 50% off</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="home-about">
        <div className="image">
          <img src={home_about} alt="home-about" />
        </div>
        <div className="content">
          <span>Tại Sao Chọn Chúng Tôi?</span>
          <h3 className="title">
          Những Gì Làm Cho Thức Ăn Của Chúng Tôi Ngon!
          </h3>
          <p>Thực Phẩm Đến Tay Khách Hàng Luôn Được Đảm Bảo Chất Lượng Tốt Nhất. Các Món Ăn Của Chúng Tôi Được Thực Hiện Bởi Nhom 1 (Đầu Bếp 5 Sao Michelin), Hứa Hẹn Mang Đến Hương Vị Bùng Nổ, Tinh Tế, Ấn Tượng. Dịch Vụ Giao Hàng Tận Nơi Của Chúng Tôi Rất Chuyên Nghiệp, Thực Khách Có Thể Thưởng Thức Chất Lượng Như Tại Nhà Hàng</p>
          <NavLink className='btn' to={'/about'} >
          Đọc thêm
          </NavLink>
          <div className="icons-container">
            <div className="icons">
              <img src={chuyen_phat_nhanh} alt="Chuyển Phát Nhanh" />
              <h3>Chuyển Phát Nhanh</h3>
            </div>
            <div className="icons">
              <img src={thuc_an_sach} alt="Thức Ăn Sạch" />
              <h3>Thức Ăn Sạch</h3>
            </div>
            <div className="icons">
              <img src={chat_luong_tot} alt="Chất Lượng Tốt Nhất" />
              <h3>Chất Lượng Tốt Nhất</h3>
            </div>
            <div className="icons">
              <img src={ho_tro_24_7} alt="Hỗ Trợ 24/7" />
              <h3>Hỗ Trợ 24/7</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
