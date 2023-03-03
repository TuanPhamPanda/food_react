import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { menuFood } from "../../ultis/menus";
import { Food } from "../../components";
import icons from "../../ultis/icons";
import { FoodApi } from "../../apis/FoodApi";

const { AiOutlineArrowLeft, AiOutlineArrowRight } = icons;
var root, page;
var fillter = [];
const Menu = () => {
  const [status, setStatus] = useState([
    { status: "Bán Chạy nhất" },
    { status: "Bán Online" },
    { status: "Giảm Giá" },
    { status: "Món Ăn Theo Mùa" },
    { status: "Món Mới" },
  ]);

  const renderFoodAll = () => {
    return FoodApi.map((item) => <Food key={item.food_id} food={item} />);
  };

  const handleFoodAll = () => {
    hadleCancelPrice();
    hadleCancelType();

    if (root === undefined) {
      root = createRoot(document.getElementById("food"));
    }
    fillter = renderFoodAll();

    root.render(fillter);
  };

  const handleClickMenuItem = (menu) => {
    if (root === undefined) {
      root = createRoot(document.getElementById("food"));
    }
    let menuItems = renderFoodAll().filter(
      (item) =>
        item.props.food.food_category.toLocaleLowerCase() ===
        menu.toLocaleLowerCase()
    );
    root.render(menuItems);
  };

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

  useEffect(() => {
    let price = prices.find((item) => item.isActive === true);
    let type = types.find((item) => item.isActive === true);
    let sta = status.filter((item) => item.isChecked === true);

    fillter = renderFoodAll();
    if (price !== undefined || type !== undefined || sta.length !== 0) {
      if (price !== undefined) {
        let trimPrice = price.price
          .trim()
          .replaceAll("k", "")
          .replaceAll(" ", "");

        if (price.price.includes(">")) {
          let searchPrice = trimPrice.replace(">", "");
          if (root === undefined) {
            root = createRoot(document.getElementById("food"));
          }
          root.render(
            (fillter = fillter.filter(
              (item) =>
                Number.parseInt(
                  new Intl.NumberFormat("en-IN", {
                    maximumSignificantDigits: 3,
                  }).format(
                    item.props.food.food_price - item.props.food.food_discount
                  )
                ) > Number.parseInt(`${searchPrice},000`)
            ))
          );
        } else if (price.price.includes("-")) {
          let checkPrice = trimPrice.split("-");
          let searchPrice1 = Number.parseInt(
            new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(`${checkPrice[0]}`)
          );
          let searchPrice2 = Number.parseInt(
            new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(`${checkPrice[1]}`)
          );
          if (root === undefined) {
            root = createRoot(document.getElementById("food"));
          }
          fillter = fillter.filter((item) => {
            let priceFilter = Number.parseInt(
              new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(
                item.props.food.food_price - item.props.food.food_discount
              )
            );
            return priceFilter >= searchPrice1 && priceFilter <= searchPrice2;
          });
          root.render(fillter);
        } else if (price.price.includes("<")) {
          let searchPrice = trimPrice.replace("<", "");
          if (root === undefined) {
            root = createRoot(document.getElementById("food"));
          }
          fillter = fillter.filter(
            (item) =>
              Number.parseInt(
                new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(
                  item.props.food.food_price - item.props.food.food_discount
                )
              ) < Number.parseInt(`${searchPrice},000`)
          );
          root.render(fillter);
        }
      }
      if (type !== undefined) {
        fillter = fillter.filter(
          (item) => item.props.food.food_type === type.type
        );
        root.render(fillter);
      }

      if (sta.length !== 0) {
        sta.forEach((item, index) => {
          let searchStatus = item.status;
          if (searchStatus === "Bán Chạy nhất") {
            fillter = fillter.filter((food) =>
              food.props.food.food_status.includes("best seller")
            );
          } else if (searchStatus === "Bán Online") {
            fillter = fillter.filter((food) =>
              food.props.food.food_status.includes("online")
            );
          } else if (searchStatus === "Giảm Giá") {
            fillter = fillter.filter(
              (food) => Number.parseInt(food.props.food.food_discount) !== 0
            );
          } else if (searchStatus === "Món Ăn Theo Mùa") {
            fillter = fillter.filter((food) =>
              food.props.food.food_status.includes("seasonal dishes")
            );
          } else if (searchStatus === "Món Mới") {
            fillter = fillter.filter(
              (food) => food.props.food.food_status === "new dishes"
            );
          }
        });
        root.render(fillter);

        if (fillter.length === 0) {
          console.log("Không tìm thấy sản phẩm");
        }
      }
    } else {
      if (root === undefined) {
        root = createRoot(document.getElementById("food"));
      }
      root.render(renderFoodAll());
    }
  }, [prices, types, status]);

  useEffect(() => {
    if (page === undefined) {
      page = createRoot(document.getElementById("page"));
    }
    let paginations = [];
    let length = fillter.length / 6;
    paginations.push(
      <>
        <div className="inline-block">
          <span className="btn flex">
            <AiOutlineArrowLeft size={24} />
          </span>
        </div>
      </>
    );

    for (let i = 1; i <= length; i++) {
      paginations.push(
        <>
          <div className="inline-block">
            <span className="btn flex">{i}</span>
          </div>
        </>
      );
    }

    paginations.push(
      <>
        <div className="inline-block">
          <span className="btn flex"><AiOutlineArrowRight size={24}/></span>
        </div>
      </>
    );
    page.render(paginations);
  }, [fillter]);

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

          <div className="col-sm-8 mx-[15px] px-[15px]">
            <div className="flex flex-wrap mb-[-15px]">
              <div className="menu-tabs flex justify-center flex-wrap">
                <button
                  onClick={() => {
                    handleFoodAll();
                  }}
                  className="menu-tab-item"
                >
                  All
                </button>
                {menuFood.map((item, index) => (
                  <button
                    onClick={() => handleClickMenuItem(item.text)}
                    className="menu-tab-item"
                    key={index}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
            <div className="row box-container" id="food">
              {renderFoodAll()}
            </div>

            <div
              id="page"
              className="action-row flex justify-center items-center"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
