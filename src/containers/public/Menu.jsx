import React, { useState, useEffect } from "react";
import { menuFood } from "../../ultis/menus";
import { Food } from "../../components";
import icons from "../../ultis/icons";
import { FoodApi } from "../../apis/FoodApi";

const { AiOutlineArrowLeft, AiOutlineArrowRight } = icons;

const Menu = () => {
  const [status, setStatus] = useState([
    { status: "Bán Chạy nhất" },
    { status: "Bán Online" },
    { status: "Giảm Giá" },
    { status: "Món Ăn Theo Mùa" },
    { status: "Món Mới" },
  ]);

  const [newStatus, setNewStatus] = useState([]);

  const [prices, setPrices] = useState([
    { price: "10k - 15k" },
    { price: "16k - 25k" },
    { price: "26k - 35k" },
    { price: "> 35k" },
    { price: "< 10k" },
  ]);

  const [types, setTypes] = useState([{ type: "Mặn" }, { type: "Chay" }]);

  const handleActiveType = (type) => {
    setTypes((prev) =>
      prev.map((item) =>
        item.type === type
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );
  };

  const handleActivePrice = (price) => {
    setPrices((prev) =>
      prev.map((item) =>
        item.price === price
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );
  };

  const hadleCancelType = () => {
    setTypes((prev) =>
      prev.map((item) => {
        return { type: item.type, isActive: false };
      })
    );
  };

  const hadleCancelPrice = () => {
    setPrices((prev) =>
      prev.map((item) => {
        return { price: item.price, isActive: false };
      })
    );
  };

  const handleActiveStatus = (sta) => {
    setNewStatus((prev) => {
      const isChecked = newStatus.some((item) => item.status === sta);
      if (isChecked) {
        return [...prev];
      } else {
        return [...prev, { status: sta, isChecked: true }];
      }
    });
  };

  const handleCancelStatus = (sta) => {
    setNewStatus(() => {
      let isChecked = newStatus.find((item) => item.status === sta);
      let temp = newStatus
        .map((item) => {
          if (isChecked.isChecked && item.status === isChecked.status) {
            return undefined;
          } else {
            return item;
          }
        })
        .filter((item) => item !== undefined);
      return temp;
    });
  };

  useEffect(() => {
    let temp = [];

    status.forEach((item) => {
      let isChecked = newStatus?.find((i) => i.status === item.status);
      if (isChecked?.isChecked !== undefined) {
        temp.push(isChecked);
      } else if (!isChecked?.isChecked) {
        temp.push({ status: item.status });
      }
    });
    setStatus(temp);
  }, [newStatus]);

  return (
    <div className="auth-inner">
      <div className="menu-section">
        <div className="heading">
          <span>Thực Đơn</span>
          <h3>Món Ăn Đặc Biệt Của Chúng Tôi</h3>
        </div>
        <div className="flex justify-center">
          <div className="col-sm-4 col-12 filter-box">
            <div className="row search-box">
              <input
                type="text"
                className="placeholder:text-white search-input"
                placeholder="Tìm Kiếm..."
              />
            </div>

            <div className="row filter-heading">
              <h1>Trạng thái</h1>
            </div>

            <div className="row filter-section">
              <ul className="filter-option">
                {status.map((item, index) => {
                  return (
                    <li key={index}>
                      <span
                        className="flex justify-between cursor-pointer"
                        onClick={(e) => {
                          handleActiveStatus(item.status);
                        }}
                      >
                        {item.status}
                      </span>
                      {item.isChecked && (
                        <button
                          onClick={() => handleCancelStatus(item.status)}
                          className={`select-btn bg-main-primary text-white`}
                        >
                          x
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              <hr />
            </div>

            <div className="row filter-heading">
              <h1>Giá</h1>
            </div>

            <div className="row filter-section">
              <ul className="filter-option">
                {prices.map((item, index) => {
                  return (
                    <li key={index}>
                      <span
                        onClick={() => handleActivePrice(item.price)}
                        className={`flex justify-between text-[16px] ${
                          item.isActive
                            ? "bg-main-primary text-white cursor-default"
                            : "cursor-pointer"
                        }`}
                      >
                        {item.price}
                      </span>
                      {item.isActive && (
                        <button
                          onClick={() => hadleCancelPrice()}
                          className={`select-btn bg-main-primary text-white`}
                        >
                          x
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              <hr />
            </div>

            <div className="row filter-heading">
              <h1>Loại</h1>
            </div>

            <div className="row filter-section">
              <ul className="filter-option">
                {types.map((item, index) => {
                  return (
                    <li key={index}>
                      <span
                        onClick={() => handleActiveType(item.type)}
                        className={`flex justify-between text-[16px] ${
                          item.isActive
                            ? "bg-main-primary text-white cursor-default"
                            : "cursor-pointer"
                        }`}
                      >
                        {item.type}
                      </span>
                      {item.isActive && (
                        <button
                          onClick={() => hadleCancelType()}
                          className={`select-btn bg-main-primary text-white`}
                        >
                          x
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="flex flex-wrap mb-[-15px]">
              <div className="menu-tabs flex justify-center flex-wrap">
                <button className="menu-tab-item">All</button>
                {menuFood.map((item, index) => (
                  <button className="menu-tab-item" key={index}>
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
            <div className="row box-container">
                {FoodApi.map((item) => (
                  <Food key={item.food_id} food={item} />
                ))}
            </div>
            <div className="action-row flex justify-center items-center">
              <div className="inline-block">
                <span className="btn flex">
                  <AiOutlineArrowLeft size={24} />
                </span>
              </div>
              <div className="inline-block">
                <span className="highlight">1</span>
              </div>
              <div className="inline-block">
                <span>2</span>
              </div>
              <div className="inline-block">
                <span>3</span>
              </div>
              <div className="inline-block">
                <span>4</span>
              </div>
              <div className="inline-block">
                <span>5</span>
              </div>
              <div className="inline-block">
                <span>6</span>
              </div>
              <div className="inline-block">
                <span className="btn flex">
                  <AiOutlineArrowRight size={24} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
