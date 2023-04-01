import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Order() {
  const location = useLocation();
  const [pay, setPay] = useState({})
  const totalPriceFood = location.state.totalPriceFood;

  return (
    <div className="auth-inner">
      <div className="order-section">
        <div className="form w-2/3 my-0 mx-auto shadow-2xl shadow-yellow-500/50 p-10">
          <div className="flex justify-between text-xl">
            <span>Đặt đơn hàng</span>
            <div className="flex">
              <span>{`Tổng tiền:  ${location.state.totalPriceFood} VNĐ`}</span>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <span className="text-center uppercase text-2xl font-bold">Chi tiết vận chuyển</span>
            <div className="flex gap-12 mt-8 justify-between items-center">
              <label htmlFor="phone" className="flex-none">
                Nhập số điện thoại:
              </label>
              <input className="w-full" type="tel" id="phone" />
            </div>
            <div className="flex gap-4 mt-8 justify-between items-center">
              <label htmlFor="address" className="flex-none">
                Nhập địa chỉ giao hàng:
              </label>
              <input className="w-full" type="text" id="address" />
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="order">Chọn phương thức thanh toán</label>
            <div className="flex gap-4 mt-4">
              <div className="items-center justify-center flex gap-2">
                <input value="card" name="pay" type="radio" id="card" />
                <label for="card">Thẻ (ViSa)</label>
              </div>
              <div className="items-center justify-center flex gap-2">
                <input value="cash" type="radio" name="pay" id="cash" />
                <label htmlFor="cash">Tiền mặt</label>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button className="btn w-full uppercase">Xác nhận thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
