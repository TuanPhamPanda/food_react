import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pays, renderError } from "../../../ultis/ValueStatic";
import moment from "moment";
import { toast } from "react-toastify";
import { deleteItems, createBillStatus } from "../../../apis";

function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [pay, setPay] = useState("cash");
  const totalPriceFood = location.state.totalPriceFood;
  const foodDiscount = location.state.foodDiscount;
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cash, setCash] = useState("");
  const [nameCash, setNameCash] = useState("");
  const [dateExpiry, setDateExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAddOrder = () => {
    const id = user.user_id;
    const order = {
      user_id: id,
      bill_total: totalPriceFood,
      bill_discount: foodDiscount,
      bill_paid: "false",
      bill_status: 0,
      bill_when: moment(new Date()).format("HH:mm:ss DD-MM-YYYY"),
    };
    if (phone.length === 0) {
      renderError(undefined, "phone", "Vui lòng nhập số điện thoại");
      return;
    } else if (address.length === 0) {
      renderError(["phone"], "address", "Vui lòng nhập địa chỉ");
      return;
    } else {
      order.bill_phone = phone;
      order.bill_address = address;
      order.bill_method = pay;
    }

    if (pay === "card") {
      if (cash.length === 0) {
        renderError(
          ["phone", "address"],
          "idCash",
          "Vui lòng nhập mã số trên thẻ của bạn"
        );
        return;
      } else if (nameCash.length === 0) {
        renderError(
          ["phone", "address", "idCash"],
          "nameCash",
          "Vui lòng nhập tên trên thẻ"
        );
      } else if (dateExpiry.length === 0) {
        //Lỗi date
        renderError(
          ["phone", "address", "idCash", "nameCash"],
          "dateExpiry",
          "Vui lòng chọn đúng ngày hết hạn của thẻ"
        );
        return;
      } else if (cvv.length === 0) {
        //Lỗi cvv
        renderError(
          ["phone", "address", "nameCash", "dateExpiry"],
          "cvv",
          "Vui lòng nhập cvv"
        );
        return;
      }
      renderError(["phone", "address", "nameCash", "cvv"]);
      order.pay = pay;
      order.nameCash = nameCash;
      order.dateExpiry = dateExpiry;
      order.cvv = cvv;
    }

    createBillStatus(order).then((value) => {
      if (value.status === 200 && value.data === "") {
        deleteItems(id).then((deleteCart) => {
          if (deleteCart.status === 200 && deleteCart.affectedRows !== 0) {
            toast.success("Thanh toán thành công");
            navigate("/thank");
            return;
          }
        });
        return;
      }
    });
  };

  return (
    <div className="auth-inner">
      <div className="order-section">
        <div className="form w-1/2 my-0 mx-auto shadow-2xl shadow-yellow-500/50 p-10">
          <div className="flex justify-between text-xl">
            <span>Đặt đơn hàng</span>

            <div className="flex gap-12">
              <span>{`Chiết khấu: ${foodDiscount} VNĐ`}</span>
              <span>{`Tổng tiền:  ${totalPriceFood} VNĐ`}</span>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <span className="text-center uppercase text-2xl font-bold">
              Chi tiết vận chuyển
            </span>
            <div className="relative flex gap-12 mt-8 justify-between items-center">
              <label htmlFor="phone" className="flex-none">
                Nhập số điện thoại:
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="w-3/4"
                type="tel"
                id="phone"
              />
            </div>
            <div className="relative flex gap-4 mt-14 justify-between items-center">
              <label htmlFor="address" className="flex-none">
                Nhập địa chỉ giao hàng:
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Nhập địa chỉ giao hàng"
                className="w-3/4"
                type="text"
                id="address"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-20">
            <span>Chọn phương thức thanh toán</span>
            {pays.map((item) => (
              <div
                key={item.id}
                className="items-center justify-center flex gap-2"
              >
                <input
                  type="radio"
                  id={item.id}
                  onChange={() => setPay(item.id)}
                  checked={pay === item.id}
                />
                <label htmlFor={item.id} className="cursor-pointer flex gap-4">
                  {item.textDecript}
                </label>
              </div>
            ))}
          </div>
          {pay === "card" ? (
            <>
              <div className="relative flex gap-4 mt-14 justify-between items-center">
                <label htmlFor="idCash" className="flex-none">
                  Nhập mã số trên thẻ của bạn
                </label>
                <input
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  placeholder="Nhập mã số trên thẻ của bạn"
                  className="w-3/4"
                  type="text"
                  id="idCash"
                />
              </div>
              <div className="relative flex gap-4 mt-14 justify-between items-center">
                <label htmlFor="nameCash" className="flex-none">
                  Nhập tên trên thẻ của bạn
                </label>
                <input
                  value={nameCash}
                  onChange={(e) => setNameCash(e.target.value)}
                  placeholder="Nhập tên trên thẻ của bạn"
                  className="w-3/4"
                  type="text"
                  id="nameCash"
                />
              </div>
              <div className="relative flex gap-4 mt-14 justify-between items-center">
                <label htmlFor="dateExpiry" className="flex-none">
                  Chọn ngày hết hạn trên thẻ:
                </label>
                <input
                  value={dateExpiry}
                  onChange={(e) => setDateExpiry(e.target.value)}
                  placeholder="Chọn ngày hết hạn trên thẻ"
                  className="w-3/4"
                  type="datetime-local"
                  id="dateExpiry"
                />
              </div>
              <div className="relative flex gap-4 mt-14 justify-between items-center">
                <label htmlFor="cvv" className="flex-none">
                  Nhập CVV:
                </label>
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="Nhập CVV"
                  className="w-3/4"
                  type="number"
                  id="cvv"
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="mt-12">
            <button
              onClick={() => handleAddOrder()}
              className="btn w-full uppercase"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
