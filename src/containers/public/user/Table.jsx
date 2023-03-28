import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBooking } from "../../../apis/BookingApi";
import icon_1 from "../../../assets/images/icon-1.png";
import icon_2 from "../../../assets/images/icon-2.png";
import icon_3 from "../../../assets/images/icon-3.png";
import { title } from "../../../ultis/title";
import { removeClass } from "../../../ultis/ValueStatic";

const Table = () => {
  document.title = title.table;
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [people, setPeople] = useState(0);
  const [table, setTable] = useState(0);
  const [card, setCard] = useState("");
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");

  // const removeClass = (idPrev) => {
  //   for (let i = 0; i < idPrev.length; i++) {
  //     const elementPrev = document.getElementById(`${idPrev[i]}`);
  //     const elementPrevParent = elementPrev.parentNode;
  //     const elementTempPrev = elementPrevParent.childNodes;
  //     if (
  //       elementTempPrev[elementTempPrev.length - 1].nodeName.toLowerCase() ===
  //       "span"
  //     ) {
  //       elementTempPrev[1].removeAttribute("style");
  //       elementPrevParent.removeChild(
  //         elementTempPrev[elementTempPrev.length - 1]
  //       );
  //     }
  //   }
  // };

  const renderError = (idPrev, idInput, errorMessage) => {
    if (idPrev === undefined) {
      const element = document.getElementById(`${idInput}`);
      element.style.border = "1px solid red";
      element.scrollIntoView({ behavior: "smooth" });
      const parent = element.parentNode;
      const span = document.createElement("span");
      span.className = "text-3xl text-red-500 mt-2";
      span.innerHTML = errorMessage;

      const elementTemp = parent.childNodes;
      if (
        elementTemp[elementTemp.length - 1].nodeName.toLowerCase() === "span"
      ) {
        element.parentNode.removeChild(elementTemp[elementTemp.length - 1]);
      }
      parent.appendChild(span);
      return;
    }

    if (idPrev.length === 0) {
      const arr = ["name", "phoneNumber", "when", "note"];
      removeClass(arr);
      return;
    }

    const element = document.getElementById(`${idInput}`);
    element.style.border = "1px solid red";
    element.scrollIntoView({ behavior: "smooth" });
    const parent = element.parentNode;
    const span = document.createElement("span");
    span.className = "text-3xl text-red-500 mt-2";
    span.innerHTML = errorMessage;

    const elementTemp = parent.childNodes;
    if (elementTemp[elementTemp.length - 1].nodeName.toLowerCase() === "span") {
      element.parentNode.removeChild(elementTemp[elementTemp.length - 1]);
    }
    if (idPrev) {
      removeClass(idPrev);
    }
    parent.appendChild(span);
  };

  const handleBook = () => {
    if (name.length === 0) {
      renderError(undefined, "name", "Vui lòng nhập tên");
    } else if (phoneNumber.length !== 10) {
      renderError(["name"], "phoneNumber", "Vui lòng nhâp đúng số điện thoại");
    } else if (people < 0 || people > 20) {
      renderError(
        ["name", "phoneNumber"],
        "people",
        "Vui lòng nhập số người lớn hơn 0 và bé hơn 20"
      );
    } else if (when.length === 0) {
      renderError(
        ["name", "phoneNumber", "people"],
        "when",
        "Vui lòng chọn thời gian"
      );
    } else if (note.length === 0) {
      renderError(
        ["name", "phoneNumber", "when", "note"],
        "note",
        "Vui lòng ghi nhập tin nhắn"
      );
    } else {
      renderError([]);
      const booktable = {
        book_name: name,
        book_phone: phoneNumber,
        book_people: +people,
        book_tables: +table,
        user_id: card,
        book_when: when,
        book_note: note,
      };

      createBooking(booktable).then((reponse) => {
        if (reponse.status === 200) {
          toast.success("Đặt bàn thành công");
          navigate("/");
        } else {
          toast.error("Đặt bàn thất bại");
        }
      });
    }
  };
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
            <label htmlFor="name">Họ và Tên</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="phoneNumber">Số điện thoại</label>

            <input
              id="phoneNumber"
              className="p-2"
              type="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div class="row gap-4">
          <div class="input-box">
            <label for="people">Số Người</label>
            <input
              type="number"
              min={0}
              max={20}
              value={people}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 && value <= 20) {
                  setPeople(e.target.value);
                } else {
                  setPeople(0);
                }
              }}
              id="people"
            />
          </div>
          <div class="input-box">
            <label for="oTables">Số Bàn</label>
            <input
              type="number"
              id="tables"
              value={table}
              placeholder="Nhập số bàn"
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 && value <= 10) {
                  setTable(value);
                }
              }}
            />
          </div>
        </div>
        <div class="row gap-4">
          <div class="input-box">
            <label for="card">Thẻ Thành Viên Của Bạn</label>
            <input
              type="text"
              value={card}
              placeholder="Nhập thẻ thành viên của bạn..."
              onChange={(e) => setCard(e.target.value)}
              id="card"
            />
          </div>

          <div class="input-box">
            <label for="when">Thời Gian</label>
            <input
              type="datetime-local"
              id="when"
              value={when}
              onChange={(e) => {
                setWhen(moment(e.target.value).format("YYYY-MM-DD HH:mm:ss"));
              }}
            />
          </div>
        </div>
        <div class="row gap-4">
          <div class="input-box">
            <label for="note">Ghi Chú</label>
            <textarea
              style={{ marginTop: "16px" }}
              placeholder="Tin nhắn của bạn, Bạn có muốn trang trí bàn của bạn"
              id="note"
              cols="30"
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
