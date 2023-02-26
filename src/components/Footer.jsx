import React from "react";
import { NavLink } from "react-router-dom";
import icons from "../ultis/icons";

function Footer() {
  const {
    BsPinterest,
    BsInstagram,
    BsTwitter,
    BsFacebook,
    AiOutlineArrowRight,
  } = icons;

  return (
    <div className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Thực Đơn Của Chúng Tôi</h3>
          <NavLink to="/menu">
            <AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6"> Bánh Mì</span>
          </NavLink>
          <NavLink to="/menu">
            <AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6"> Bún</span>
          </NavLink>
          <NavLink to="/menu">
            <AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6"> Phở</span>
          </NavLink>
          <NavLink to="/menu">
            <AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6"> Món phụ</span>
          </NavLink>
          <NavLink to="/menu">
            <AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6"> Tráng miệng</span>
          </NavLink>
          <NavLink to="/menu">
            <AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6"> Thức uống</span>
          </NavLink>
        </div>
        <div className="box">
          <h3>Đường dẫn nhanh</h3>
          <NavLink to="/"><AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6">Trang chủ</span></NavLink>
          <NavLink to="/about"><AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6">Thông tin</span></NavLink>
          <NavLink to="/promotion"><AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6">Promotions</span></NavLink>
          <NavLink to="/menu"><AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6">Thực đơn</span></NavLink>
          <NavLink to="/table"><AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6">Đặt bàn</span></NavLink>
        </div>
        <div className="box">
          <h3>Liên Kết</h3>
          <NavLink to="/login"><AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6">Đăng nhập</span></NavLink>
          <NavLink to="/register"><AiOutlineArrowRight className="inline" /> <span className="items-center gap-3 hover:pl-6">Đăng ký</span></NavLink>
        </div>
        <div className="box">
          <h3>Giờ Mở Cửa</h3>
          <p>Hàng Ngày : 7:00 AM - 10:00 PM</p>
        </div>
      </div>
      <div className="bottom">
        <div className="share flex justify-center">
          <NavLink
            to="https://www.facebook.com/"
            className="flex justify-center items-center"
          >
            <BsFacebook />
          </NavLink>
          <NavLink
            to="https://twitter.com/?lang=en"
            className="flex justify-center items-center"
          >
            <BsTwitter />
          </NavLink>
          <NavLink
            to="https://www.instagram.com/"
            className="flex justify-center items-center"
          >
            <BsInstagram />
          </NavLink>
          <NavLink
            to="https://www.pinterest.com/"
            className="flex justify-center items-center"
          >
            <BsPinterest />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Footer;
