import React, { useState } from "react";
import banhmi from '../../../assets/images/banhmi/banhmi1.png';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { title } from "../../../ultis/title";

const Cart = () => {
  document.title = title.cart;
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  return (
    <div className="auth-inner">
      <div className="shopping-cart-section">
        <div className="heading">
          <span>Giỏ Hàng</span>
          <h3>Sản Phẩm Tốt, Giao Hàng Nhanh</h3>
        </div>
        <div className="container">
          <div className="wrapper wrapper-content">
            <div className="row">
              <div className="in-cart col-md-9">
                <div className="box">
                  <div className="box-title item-total row gap-3">
                    <div>
                      <span className="text-[15px] flex gap-2">
                        {3} sản phẩm trong giỏ hàng của bạn
                      </span>
                    </div>
                  </div>
                  {/* 
                    <div>
                        <div className="box-content row no-food">
                            <div className="content">
                                <h2 style="color: #057835fa;">Bạn Chưa Có Sản Phẩm Nào Trong Giỏ Hàng, Hãy Đến Cửa Hàng Ngay!</h2>
                            </div>
                            <div className="image">
                                <img src="../assets/images/notfound.png" alt="" />
                            </div>
                        </div>
                    </div> */}

                  <div>
                    <div>
                      <div className="box-content row gap-2">
                        <div
                          className="image-box col-sm-3"
                          style={{ paddingLeft: "0px" }}
                        >
                          <img
                            src={banhmi}
                            alt=""
                            className="cart-product-img"
                          />
                        </div>

                        <div className="desc col-sm-4">
                          <div className="flex flex-col gap-3">
                            <h2 className="item-name text-3xl font-bold">
                              Bánh Mì Chảo(Hà Nội)
                            </h2>
                            <div className="item-desc">
                              <b>Mô tả</b>
                              <p>1 Phần Mỗi Khẩu Phần</p>
                            </div>
                          </div>

                          <button className="btn remove-btn text-2xl py-2 px-4 mt-8">
                            Xóa
                          </button>
                        </div>

                        <div className="item-price col-sm-1 flex flex-col gap-2">
                          <span className="sale-price">Giá KM: 16000 VND</span>
                          <p className="text-muted first-price">
                            Giá gốc: 25000 VNĐ
                          </p>
                        </div>

                        <div className="item-qty col-sm-2 w-full flex gap-2">
                          <label
                            htmlFor="iQuantity"
                            className="flex-none"
                            style={{ fontSize: "12px" }}
                          >
                            Số lượng:
                          </label>
                          <input
                            onChange={(e)=>setCount(e.target.value)}
                            id="iQuantity"
                            value={count}
                            type="number"
                            className="focus form-control item-quantity text-center h-[15px] border-blue-500"
                            min="1"
                            max="10"
                          />
                        </div>

                        <div className="cal-total col-sm-2">
                          <h4 className="item-total">Tổng: 2600000 VND</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box-content row">
                  <NavLink to="/menu" className="btn shop-btn">
                    Tiếp tục mua hàng
                  </NavLink>
                  <button
                    className="btn check-out-btn"
                    style={{ marginLeft: "10px" }}
                  >
                    Thanh Toán
                  </button>
                </div>
              </div>

              <div className="col-md-3">
                <div className="box">
                  <div className="box-title">
                    <h3>Tóm Tắt Giỏ Hàng</h3>
                  </div>

                  <div className="box-content">
                    <div className="content-price">
                      <span>Tóm Lược</span>
                      <h3 className="font-bold total-first-price">77000VND</h3>
                    </div>

                    <div className="content-price">
                      <span>Chiết Khấu</span>
                      <h3 className="font-bold total-discount">6000VND</h3>
                    </div>

                    <div className="content-price">
                      <span>Phí Giao Hàng</span>
                      <h3 className="font-bold total-delivery">15VND</h3>
                    </div>

                    <hr className="mb-3" />

                    <div className="content-price">
                      <span>Tổng Cộng</span>
                      <h2 className="font-bold total-sale">71015VND</h2>
                    </div>

                    <div className="btn-group flex gap-2">
                      <button className="btn check-out-btn">Thanh Toán</button>
                      <button className="btn cancel-btn">Hủy Bỏ</button>
                    </div>
                  </div>
                </div>

                <div className="box">
                  <div
                    style={{ padding: "12px 0px" }}
                    className="box-content text-center flex flex-col"
                  >
                    <h3 className="border-solid border-b w-full border-0 mb-4 border-gray-300">
                      Hỗ Trợ
                    </h3>

                    <h3>
                      <i className="fa fa-phone"></i> +84 975 695 547
                    </h3>
                    <span className="small">
                      Vui Lòng Liên Hệ Với Chúng Tôi Nếu Bạn Có Bất Kỳ Câu Hỏi
                      Nào. Chúng Tôi Có Sẵn 24h.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
