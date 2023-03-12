import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { menuFood } from "../../../ultis/menus";
import { Food } from "../../../components";
import { FoodApi } from "../../../apis/FoodApi";
import ReactPaginate from "react-paginate";
import icons from "../../../ultis/icons";

var root, page;
const {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
  FaShoppingCart,
} = icons;
const itemsPerPage = 6;
const Menu = () => {
  const [count, setCount] = useState(1);

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  const [cart, setCart] = useState({});

  const getCart = (cart) => {
    setCart(cart);
  };

  const handleAddToCart = () => {
    alert(12345);
  };  

  let img_src = `../../assets/images/${cart.food_src}`;

  const modalContainer = document.querySelector(".modal-container");

  modalContainer?.addEventListener("click", function (event) {
    event.stopPropagation();
  });
  
  const [user, setUser] = useState(() => {
    const storage = localStorage.getItem("user");
    return storage ?? {};
  });

  const [active, setActive] = useState("");
  let items = FoodApi;
  const [fillter, setFillter] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  let endOffset = itemOffset + itemsPerPage;
  let currentItems = items.slice(itemOffset, endOffset);
  let pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event, length) => {
    const newOffset = (event.selected * itemsPerPage) % length;
    setItemOffset(newOffset);
  };

  const [status, setStatus] = useState([
    { status: "Bán Chạy nhất" },
    { status: "Bán Online" },
    { status: "Giảm Giá" },
    { status: "Món Ăn Theo Mùa" },
    { status: "Món Mới" },
  ]);

  const handleFoodAll = () => {
    hadleCancelPrice();
    hadleCancelType();
    setFillter(renderFoodAll());
  };

  const handleClickMenuItem = (menu) => {
    setItemOffset(0);

    const arr = [];

    let menuItems = FoodApi.map((food) => (
      <Food cart={getCart} key={food.food_id} food={food} />
    )).filter((item) => {
      return (
        item.props.food.food_category.toLocaleLowerCase() ===
        menu.toLocaleLowerCase()
      );
    });

    setFillter(menuItems);
  };

  const renderFoodAll = () => {
    return FoodApi.map((item) => (
      <Food cart={getCart} key={item.food_id} food={item} />
    ));
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

    let arrayTemp = fillter;

    if (price !== undefined || type !== undefined || sta.length !== 0) {
      if (sta.length !== 0) {
        sta.forEach((item) => {
          let searchStatus = item.status;

          if (searchStatus.toLowerCase() === "Bán Chạy nhất".toLowerCase()) {
            arrayTemp = fillter.filter((food) =>
              food.props.food.food_status.includes("best seller")
            );
          }

          if (searchStatus.toLowerCase() === "Bán Online".toLowerCase()) {
            arrayTemp = arrayTemp.filter((food) => {
              return food.props.food.food_status.includes("online") === true;
            });
          }

          if (searchStatus === "Giảm Giá") {
            arrayTemp = arrayTemp.filter((food) => {
              console.log(food);
              return Number.parseInt(food.props.food.food_discount) !== 0;
            });
          }

          if (searchStatus === "Món Ăn Theo Mùa") {
            arrayTemp = arrayTemp.filter((food) => {
              return food.props.food.food_status.includes("seasonal dishes");
            });
          }

          if (searchStatus === "Món Mới") {
            arrayTemp = arrayTemp.filter((food) =>
              food.props.food.food_status.includes("new dishes")
            );
          }
        });
      }

      let trimPrice = price.price
        .trim()
        .replaceAll("k", "")
        .replaceAll(" ", "");

      if (price.price.includes(">")) {
        let searchPrice = trimPrice.replace(">", "");
        arrayTemp = arrayTemp.filter(
          (item) =>
            Number.parseInt(
              new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(
                item.props.food.food_price - item.props.food.food_discount
              )
            ) > Number.parseInt(`${searchPrice},000`)
        );
      }

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

      arrayTemp = arrayTemp.filter((item) => {
        let priceFilter = Number.parseInt(
          new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3,
          }).format(item.props.food.food_price - item.props.food.food_discount)
        );
        return priceFilter >= searchPrice1 && priceFilter <= searchPrice2;
      });

      /*
        } else if (price.price.includes("<")) {
          let searchPrice = trimPrice.replace("<", "");
          setFillter(
            fillter.filter(
              (item) =>
                Number.parseInt(
                  new Intl.NumberFormat("en-IN", {
                    maximumSignificantDigits: 3,
                  }).format(
                    item.props.food.food_price - item.props.food.food_discount
                  )
                ) < Number.parseInt(`${searchPrice},000`)
            )
          );
        }
      } else if (type !== undefined) {
        setFillter(
          fillter.filter((item) => item.props.food.food_type === type.type)
        );
      }
      */
    } else {
      setFillter(renderFoodAll());
    }
  }, [prices, types, status]);

  useEffect(() => {
    console.log(fillter);

    if (root === undefined) {
      root = createRoot(document.getElementById("food"));
    }

    endOffset = itemOffset + itemsPerPage;
    currentItems = fillter.slice(itemOffset, endOffset);
    pageCount = Math.ceil(fillter.length / itemsPerPage);

    if (page === undefined) {
      page = createRoot(document.getElementById("page"));
    }

    root.render(
      currentItems.map((item) => {
        return (
          <Food
            key={item.props.food.food_id}
            cart={getCart}
            food={item.props.food}
          />
        );
      })
    );

    if (currentItems.length === 0) {
      root.render(<h1>Không tìm thấy sản phẩm</h1>);
    }

    page.render(
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiOutlineArrowRight size={30} />}
          onPageChange={(e) => {
            handlePageClick(e, (e) => {
              setItemOffset((e.selected * itemsPerPage) % fillter.length);
            });
          }}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          activeClassName="active"
          containerClassName="pagination"
          nextClassName="page-num"
          previousClassName="page-num"
          previousLabel={<AiOutlineArrowLeft size={30} />}
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }, [fillter]);

  return (
    <>
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
                            className={`select-btn bg-main-primary-green text-white`}
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
                            item.isActive ? "cursor-default" : "cursor-pointer"
                          }`}
                        >
                          {item.price}
                        </span>
                        {item.isActive && (
                          <button
                            onClick={() => hadleCancelPrice()}
                            className={`select-btn bg-main-primary-green text-white`}
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
                            item.isActive ? "cursor-default" : "cursor-pointer"
                          }`}
                        >
                          {item.type}
                        </span>
                        {item.isActive && (
                          <button
                            onClick={() => hadleCancelType()}
                            className={`select-btn bg-main-primary-green text-white`}
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
                  {menuFood.map((item, index) => (
                    <button
                      id={index}
                      key={index}
                      className={
                        active == index
                          ? "mx-3 menu-tab-item bg-main-primary-orange"
                          : "mx-3 menu-tab-item bg-main-primary-green"
                      }
                      onClick={(e) => {
                        handleClick(e);
                        item.text === "All"
                          ? handleFoodAll()
                          : handleClickMenuItem(item.text);
                      }}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>
              <div className="row box-container" id="food">
                {currentItems.map((item) => (
                  <Food cart={getCart} key={item.food_id} food={item} />
                ))}
              </div>
              <div id="page">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<AiOutlineArrowRight size={30} />}
                  onPageChange={(e) => {
                    handlePageClick(e, items.length);
                  }}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  activeClassName="active"
                  containerClassName="pagination"
                  nextClassName="page-num"
                  previousClassName="page-num"
                  previousLabel={<AiOutlineArrowLeft size={30} />}
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal">
        <div className="modal-container">
          <div className="modal-close text-white">
            <AiOutlineClose size={25} />
          </div>
          <header className="modal-header gap-2">
            <span className="text-white">
              <FaShoppingCart size={25} />
            </span>
            <h2 className="modal-heading-text text-white text-3xl">
              Thêm vào giỏ hàng
            </h2>
          </header>
          <div className="modal-body">
            <div className="flex mb-8 gap-4">
              <div className="image">
                <img width={200} height={200} src={img_src} alt="" />
              </div>
              <div className="flex flex-col ml-4 gap-8 text-3xl justify-center">
                <h2 className="text-primary-green">Tên: {cart.food_name}</h2>
                <h3>Mô tả: {cart.food_desc}</h3>
                <h3>
                  Giá:{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumSignificantDigits: 3,
                  }).format(cart.food_price - cart.food_discount)}{" "}
                  VND
                </h3>
                <label htmlFor="iQuantity">
                  Số lượng:{" "}
                  <input
                    className="text-center"
                    id="iQuantity"
                    type="number"
                    onChange={(e) => setCount(e.target.value)}
                    min={1}
                    max={10}
                    value={count}
                  />
                </label>
              </div>
            </div>
            <button className="btn w-full" onClick={()=>{handleAddToCart()}}>
              Thêm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
