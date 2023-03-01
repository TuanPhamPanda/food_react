import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    console.log(newStatus);
  }, [newStatus]);

  const handleCancelStatus = (sta) => {
    setNewStatus((prev) => {
      const isChecked = newStatus.some((item) => item.status === sta);
      if (isChecked) {
        return newStatus.filter((item) => item.status !== sta);
      } else {
        return [...prev];
      }
    });
  };

  useEffect(() => {
    
  }, [newStatus]);

  return (
    <div className="auth-inner">
      <div className="menu-section">
        <div className="heading">
          <span>Thực Đơn</span>
          <h3>Món Ăn Đặc Biệt Của Chúng Tôi</h3>
        </div>
        <div className="flex row">
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
                      <button
                        onClick={(e) => {
                          handleCancelStatus(item.status);
                        }}
                        className="select-btn bg-main-primary text-white"
                      >
                        x
                      </button>
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
        </div>
      </div>
    </div>
  );
};

export default Menu;
