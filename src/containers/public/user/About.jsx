import React from "react";
import taco_chefcartoon from "../../../assets/images/taco-chefcartoon.png";
import bun5 from '../../../assets/images/anhkremove/bun5.jpg'
import banhmi8 from '../../../assets/images/anhkremove/banhmi8.jpg'
import banhmi4 from '../../../assets/images/anhkremove/banhmi4.jpg'
import pho2 from '../../../assets/images/anhkremove/pho2.jpg'
import pho9 from '../../../assets/images/anhkremove/pho9.jpg'
import bun3 from '../../../assets/images/anhkremove/bun3.jpg'
import pho6 from '../../../assets/images/anhkremove/pho6.jpg'
import tu5 from '../../../assets/images/anhkremove/tu5.jpg'
import tm4 from '../../../assets/images/anhkremove/tm4.jpg'
import tm7 from '../../../assets/images/anhkremove/tm7.jpg'
import { title } from "../../../ultis/title";

function About() {
  document.title = title.about;
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div className="about-section">
          <div className="heading">
            <span>Về Chúng Tôi</span>
            <h3>Món Ăn Chất Lượng Tốt</h3>
          </div>
          <div className="row">
            <div className="about-content">
              <img src={taco_chefcartoon} alt="taco_chefcartoon" />
              <div className="about-content-text">
                <p>
                  Nhà Hàng Món Ăn Việt Của Chúng Tôi Được Thành Lập Bởi NHOM 1
                  (Một Đầu Bếp 5 Sao Michelin) Vào Năm 2022 Tại Việt Nam. Sau
                  Đó, Nhờ Sự Ủng Hộ Của Khách Hàng, Thương Hiệu Của Chúng Tôi Đã
                  Được Phổ Biến Toàn Cầu Tại Các Thị Trường Như Úc, Mỹ, Canada,
                  Anh, Pháp, Đức, Bỉ, Nga, Trung Quốc, Nhật Bản, Singapore,... ,
                  Những Sản Phẩm Mà Chúng Tôi Đưa Đến Tay Khách Hàng Luôn Là
                  Những Sản Phẩm Chất Lượng Nhất.
                </p>
                <p>
                  Khách Hàng Có Thể Dùng Bữa Tại Nhà Hàng Để Trải Nghiệm Không
                  Khí Đậm Chất Việt Nam Hoặc Có Thể Đặt Đồ Ăn Được Giao Đến Tận
                  Nhà.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="about-article">
              <h3>Thức Ăn Mang Mọi Người Lại Với Nhau</h3>
            </div>
          </div>
          <div className="row gallery">
            <div className="wrapper">
              <img src={banhmi4} alt="" />
              <img src={banhmi8} alt="" />
              <img src={bun3} alt="" />
              <img src={bun5} alt="" />
              <img src={pho2} alt="" />
              <img src={pho9} alt="" />
              <img src={pho6} alt="" />
              <img src={tu5} alt="" />
              <img src={tm4} alt="" />
              <img src={tm7} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
