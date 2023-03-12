import React from "react";
import icon_1 from "../../../assets/images/icon-1.png";
import icon_2 from "../../../assets/images/icon-2.png";
import icon_3 from "../../../assets/images/icon-3.png";

const Table = () => {

  const handleBook = (e) => {
    alert(123);
  }

  return (
    <div className="order-section">
      <div className="heading">
        <span>Đặt Bàn</span>
        <h3>Tận Hưởng Khoảnh Khắc Của Bạn</h3>
      </div>
      <div className="icons-container">
        <div className="icons flex flex-col items-center">
          <img src={icon_1} alt="" />
          <h3>7:00am to 10:00pm</h3>
        </div>
        <div className="icons flex flex-col items-center">
          <img src={icon_2} alt="" />
          <h3>+84 975 695 547</h3>
        </div>
        <div className="icons flex flex-col items-center">
          <img src={icon_3} alt="" />
          <h3>HUTECH - Thu Duc Campus</h3>
        </div>
      </div>
      <div id="bookTableForm">
        <div className="flex row">
          <div className="input-box">
            <label htmlFor="uName">Họ và Tên</label>
            <input type="text" id="uName" />
          </div>
          <div className="input-box">
            <label htmlFor="uPhone">Số điện thoại</label>
            <input type="text" id="uPhone" />
          </div>
        </div>
        <div class="flex row">
          <div class="input-box">
            <label for="oPeople">Số Người</label>
            <input type="number" id="oPeople" />
          </div>
          <div class="input-box">
            <label for="oTables">Số Bàn</label>
            <input type="number" id="oTables" />
          </div>
        </div>
        <div class="flex row">
          <div class="input-box">
            <label for="uCard">Thẻ Thành Viên Của Bạn</label>
            <input type="text" id="uCard" />
          </div>
          <div class="input-box">
            <label for="oWhen">Thời Gian</label>
            <input type="datetime-local" id="oWhen" />
          </div>
        </div>

        <div class="flex row">
          <div class="input-box">
            <label for="uMessage">Ghi Chú</label>
            <textarea
              placeholder="Tin nhắn của bạn, Bạn có muốn trang trí bàn của bạn"
              id="uMessage"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div class="input-box">
            <iframe
              title="map"
              class="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4206639905988!2d106.78291401458974!3d10.855574792267841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276e7ea103df%3A0xb6cf10bb7d719327!2zSHV0ZWNoIEtodSBFIC0gVHJ1bmcgVMOibSDEkMOgbyBU4bqhbyBOaMOibiBM4buxYyBDaOG6pXQgTMaw4bujbmcgQ2Fv!5e0!3m2!1svi!2s!4v1672736035162!5m2!1svi!2s"
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <button onClick={handleBook} className="btn">Book Now</button>
      </div>
    </div>
  );
};

export default Table;
