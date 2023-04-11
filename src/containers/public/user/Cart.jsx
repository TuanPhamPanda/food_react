import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { title } from "../../../ultis/title";
import { allItems } from "../../../apis/CartApi";
import {
  deliveryCharges,
  phoneContact1,
  phoneContact2,
} from "../../../ultis/ValueStatic";
import jwt_decode from 'jwt-decode';

const Cart = () => {
  document.title = title.cart;
  const navigate = useNavigate();
  const [user, setUser] = useState(()=>{
    const localStorageUser = localStorage.getItem('user');
    if(localStorageUser){
      return jwt_decode( JSON.parse(localStorage.getItem('user')).accessToken); 
    }else{
      return {};
    }
  });
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [foodDiscount, setFoodDiscount] = useState(0);
  const navigateOrder = () => {
    navigate("/order", {
      state: {
        totalPriceFood: deliveryCharges + foodDiscount + totalPrice,
        foodDiscount,
      },
    });
  };

  useEffect(() => {
    if (user !== null) {
      allItems(user.user_id).then((value) => {
        setCarts(value.data);
      });
    }
  }, []);

  useEffect(() => {
    let total = 0;
    let totalDiscount = 0;
    if (carts.length !== 0) {
      total =
        total +
        carts
          .map((item) => item.item_qty * (item.food_price - item.food_discount))
          .reduce((total, current) => total + current);

      totalDiscount =
        totalDiscount +
        carts
          .map((item) => item.food_discount)
          .reduce((total, current) => total + current);
    }

    setFoodDiscount(totalDiscount);
    setTotalPrice(total);
  }, [carts]);

  return (
    <div className="auth-inner">
      <div className="shopping-cart-section">
        <div className="heading">
          <span>Giỏ Hàng</span>
          <h3>Sản Phẩm Tốt, Giao Hàng Nhanh</h3>
        </div>
        {carts.length === 0 ? (
          <div className="flex justify-center items-center gap-4 h-[50vh]">
          <div className="flex flex-col gap-8">
            <span>
              Giỏ hàng của bạn hiện tại còn trống 
            </span>
            <button onClick={()=>navigate('/menu')} className="btn">Mua hàng ngay</button>
            
            </div>
            </div>
        ) : (
          <div className="container">
            <div className="wrapper wrapper-content">
              {user !== null ? (
                <div className="row">
                  <div className="in-cart col-md-9">
                    <div className="box">
                      <div className="box-title item-total row gap-3">
                        <div>
                          <span className="text-[15px] flex gap-2">
                            {carts.length} sản phẩm trong giỏ hàng của bạn
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

                      {carts.map((cart, index) => (
                        <div key={cart.food_id} className="mb-4">
                          <div className="box-content row gap-2">
                            <div
                              className="image-box col-sm-3"
                              style={{ paddingLeft: "0px" }}
                            >
                              <img
                                src={`${process.env.REACT_APP_FOOD_IMAGE}/${cart.food_src}`}
                                alt=""
                                className="cart-product-img"
                              />
                            </div>

                            <div className="desc col-sm-4">
                              <div className="flex flex-col gap-3">
                                <h2 className="item-name text-3xl font-bold">
                                  {cart.food_name}
                                </h2>
                                <div className="item-desc">
                                  <b>Mô tả</b>
                                  <p>{cart.food_desc}</p>
                                </div>
                              </div>

                              <button className="btn remove-btn text-2xl py-2 px-4 mt-8">
                                Xóa
                              </button>
                            </div>

                            <div className="item-price col-sm-1 flex flex-col gap-2">
                              <span className="sale-price">
                                Giá KM: {cart.food_price - cart.food_discount}{" "}
                                VND
                              </span>
                              {cart.food_discount === 0 ? (
                                <></>
                              ) : (
                                <p className="text-muted first-price">
                                  Giá gốc: {cart.food_price} VNĐ
                                </p>
                              )}
                            </div>

                            <div className="item-qty col-sm-2 w-full flex gap-2 h-8">
                              <label
                                htmlFor={`iQuantity${index}`}
                                className="flex-none"
                                style={{ fontSize: "12px" }}
                              >
                                Số lượng:
                              </label>

                              <input
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value >= 1 && value <= 10) {
                                    setCarts((prev) => {
                                      prev.forEach((item) => {
                                        if (item.food_id === cart.food_id) {
                                          item.item_qty = value;
                                        }
                                      });
                                      return [...prev];
                                    });
                                  } else {
                                    setCarts((prev) => {
                                      prev.forEach((item) => {
                                        if (item.food_id === cart.food_id) {
                                          item.item_qty = "";
                                        }
                                      });
                                      return [...prev];
                                    });
                                  }
                                }}
                                id={`iQuantity${index}`}
                                value={cart.item_qty}
                                type="number"
                                className="focus form-control item-quantity text-center h-full border-blue-500"
                                min="1"
                                max="10"
                              />
                            </div>

                            <div className="cal-total col-sm-2 ml-4">
                              <h4 className="item-total">
                                {`Tổng:
                              ${
                                cart.item_qty *
                                (cart.food_price - cart.food_discount)
                              }
                              VNĐ`}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="box-content row">
                      <NavLink to="/menu" className="btn shop-btn">
                        Tiếp tục mua hàng
                      </NavLink>
                      <button
                        onClick={() => navigateOrder()}
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
                          <span>Tóm Lược: </span>
                          <h3 className="font-bold total-first-price">
                            {`${totalPrice} VNĐ`}
                          </h3>
                        </div>

                        <div className="content-price">
                          <span>Chiết Khấu: </span>
                          <h3 className="font-bold total-discount">{`${foodDiscount} VNĐ`}</h3>
                        </div>

                        <div className="content-price">
                          <span>Phí Giao Hàng: </span>
                          <h3 className="font-bold total-delivery">{`${deliveryCharges} VNĐ`}</h3>
                        </div>

                        <hr className="mb-3" />

                        <div className="content-price">
                          <span>Tổng Cộng</span>
                          <h2 className="font-bold total-sale">{`${
                            deliveryCharges + foodDiscount + totalPrice
                          } VNĐ`}</h2>
                        </div>

                        <div className="btn-group flex gap-2">
                          <button
                            onClick={() => navigateOrder()}
                            className="btn check-out-btn"
                          >
                            Thanh Toán
                          </button>
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
                          <i className="fa fa-phone"></i>
                          <span>{phoneContact1.split(":")[0]}:</span>{" "}
                          <input
                            type="tel"
                            value={phoneContact1.split(":")[1]}
                          />
                        </h3>
                        <h3>
                          <i className="fa fa-phone"></i>
                          <span>{phoneContact2.split(":")[0]}:</span>{" "}
                          <input
                            type="tel"
                            value={phoneContact2.split(":")[1]}
                          />
                        </h3>
                        <span className="small">
                          Vui Lòng Liên Hệ Với Chúng Tôi Nếu Bạn Có Bất Kỳ Câu
                          Hỏi Nào. Chúng Tôi Có Sẵn 24h.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="heading border-x-0 border-y-4 border-solid border-gray-200 pt-[2rem] mb-8">
                  <h3>
                    Xin mời bạn{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="btn uppercase"
                    >
                      đăng nhập
                    </button>{" "}
                    để xem giỏ hàng
                  </h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
