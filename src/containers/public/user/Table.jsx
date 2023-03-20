import React, { useState } from "react";
import icon_1 from "../../../assets/images/icon-1.png";
import icon_2 from "../../../assets/images/icon-2.png";
import icon_3 from "../../../assets/images/icon-3.png";
import { useDispatch } from "react-redux";
import { title } from "../../../ultis/title";
import { arrayPhone } from "../../../ultis/ValueStatic";

const Table = () => {
  document.title = title.table;

  const handleBook = (e) => {
    alert(123);
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState(() => arrayPhone[0].value);

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
      <div id="bookTableForm" className="form">
        <div className="row gap-4">
          <div className="input-box">
            <label htmlFor="uName">Họ và Tên</label>
            <input type="text" id="uName" />
          </div>
          <div className="input-box">
            <label htmlFor="uPhone">Số điện thoại</label>

            <div className="flex gap-2 items-center justify-center text-3xl">
              <select
                style={{ padding: "1rem 0rem" }}
                className="mt-[0.5rem] text-3xl p-4 w-2/5"
                onChange={(e) => setPhoneCode(e.target.value)}
              >
                {arrayPhone.map((item, index) => (
                  <option key={index} value={item.id}>
                    {`(${item.id}) ${item.value}`}
                  </option>
                ))}
              </select>
              <input
                id="uPhone"
                className="p-2"
                type="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div class="row gap-4">
          <div class="input-box">
            <label for="oPeople">Số Người</label>
            <input type="number" id="oPeople" />
          </div>
          <div class="input-box">
            <label for="oTables">Số Bàn</label>
            <input type="number" id="oTables" />
          </div>
        </div>
        <div class="row gap-4">
          <div class="input-box">
            <label for="uCard">Thẻ Thành Viên Của Bạn</label>
            <input type="text" id="uCard" />
          </div>

          <div class="input-box">
            <label for="oWhen">Thời Gian</label>
            <input type="datetime-local" id="oWhen" />
          </div>
        </div>

        <div class="row gap-4">
          <div class="input-box">
            <label for="uMessage">Ghi Chú</label>
            <textarea
              style={{ marginTop: "16px" }}
              placeholder="Tin nhắn của bạn, Bạn có muốn trang trí bàn của bạn"
              id="uMessage"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div class="input-box">
            <label>Chọn địa điểm</label>
            <iframe
              style={{ marginTop: "16px" }}
              title="map"
              className="map mt-4"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4206639905988!2d106.78291401458974!3d10.855574792267841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276e7ea103df%3A0xb6cf10bb7d719327!2zSHV0ZWNoIEtodSBFIC0gVHJ1bmcgVMOibSDEkMOgbyBU4bqhbyBOaMOibiBM4buxYyBDaOG6pXQgTMaw4bujbmcgQ2Fv!5e0!3m2!1svi!2s!4v1672736035162!5m2!1svi!2s"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={handleBook} className="btn w-1/2">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Table;
