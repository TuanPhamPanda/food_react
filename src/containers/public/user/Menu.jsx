import React, { useState, useEffect } from "react";
import { menuFood } from "../../../ultis/menus";
import { Food } from "../../../components";
import ReactPaginate from "react-paginate";
import icons from "../../../ultis/icons";
import { title } from "../../../ultis/title";
import { NavLink } from "react-router-dom";
import { showFoods, addItems } from "../../../apis";
import { toast } from "react-toastify";
import { quantityRender } from "../../../ultis/ValueStatic";
import jwt_decode from "jwt-decode";

const {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
  FaShoppingCart,
} = icons;
const itemsPerPage = 6;
const quantity = 10;
const Menu = () => {
  document.title = title.menu;

  const [user, setUser] = useState(()=>{
    const localStorageUser = localStorage.getItem('user');
    if(localStorageUser){
      return jwt_decode( JSON.parse(localStorage.getItem('user')).accessToken); 
    }else{
      return {};
    }
  });

  console.log(user);

  useEffect(() => {
    apiFood();
  }, []);

  const [FoodApi, setFoodApi] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  const apiFood = () => {
    showFoods()
      .then((repose) => repose)
      .then((data) => {
        if (data.status === 200) {
          setFoodApi(data.data);
        }
      });
  };

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

  const hadleCancelType = () => {
    setTypes((prev) =>
      prev.map((item) => {
        return { type: item.type, isActive: false };
      })
    );
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentItems.length;
    setItemOffset(newOffset);
  };

  const renderFullOnPage = (items) => {
    if (items !== undefined) {
      const endOffset = itemOffset + itemsPerPage;
      const currentItems = items.slice(itemOffset, endOffset);
      setPageCount(Math.ceil(items.length / itemsPerPage));
      setCurrentItems(currentItems);
    } else {
      const endOffset = itemOffset + itemsPerPage;
      const currentItems = FoodApi.slice(itemOffset, endOffset);
      setPageCount(Math.ceil(FoodApi.length / itemsPerPage));
      setCurrentItems(currentItems);
    }
  };

  useEffect(() => {
    renderFullOnPage(FoodApi);
    setPageCount(Math.ceil(FoodApi.length / itemsPerPage));
  }, [FoodApi]);

  useEffect(() => {
    renderFullOnPage();
  }, [itemOffset]);

  const [count, setCount] = useState(1);

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  const [cart, setCart] = useState({});
  const img_src = `${process.env.REACT_APP_FOOD_API}/images/${cart.food_src}`;

  const getCart = (cart) => {
    setCart(cart);
  };

  const handleAddToCart = (e) => {
    const cartForm = {
      user_id: user.user_id,
      food_id: cart.food_id,
      item_qty: +count,
    };

    addItems(cartForm)
      .then((reponse) => {
        if (reponse.status === 200) {
          toast.info("Đã thêm 1 sản phẩm vào giỏ hàng");
        }
      })
      .catch((error) => console.log(error));
  };

  const [active, setActive] = useState("");

  const handleFoodAll = () => {
    hadleCancelType();
    hadleCancelPrice();
  };

  const handleClickMenuItem = (menu) => {
    let menuItems = FoodApi.filter((item) => {
      return (
        item.food_category.toLocaleLowerCase() ===
        menu.toLocaleLowerCase()
      );
    });

    renderFullOnPage(menuItems);
  };

  const renderFoodAll = () => {
    return FoodApi.map((item) => (
      <Food cart={getCart} key={item.food_id} food={item} />
    ));
  };

  const [prices, setPrices] = useState([
    { price: "10k - 15k" },
    { price: "16k - 25k" },
    { price: "26k - 35k" },
    { price: "> 35k" },
    { price: "< 10k" },
  ]);

  const handleActivePrice = (price) => {
    setPrices((prev) =>
      prev.map((item) =>
        item.price === price
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );
  };

  const hadleCancelPrice = () => {
    setPrices((prev) =>
      prev.map((item) => {
        return { price: item.price, isActive: false };
      })
    );
  };

  useEffect(() => {
    let price = prices.find((item) => item.isActive === true);
    if (price) {
      let trimPrice = price.price
        .trim()
        .replaceAll("k", "")
        .replaceAll(" ", "");

      let arrayTemp = FoodApi;

      if (price.price.includes(">")) {
        let searchPrice = trimPrice.replace(">", "");
        arrayTemp = arrayTemp.filter(
          (item) =>
            Number.parseInt(
              new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(item.food_price - item.food_discount)
            ) > Number.parseInt(`${searchPrice},000`)
        );
      } else if (price.price.includes("<")) {
        let searchPrice = trimPrice.replace("<", "");
        setCurrentItems(
          currentItems.filter(
            (item) =>
              Number.parseInt(
                new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(item.food_price - item.food_discount)
              ) < Number.parseInt(`${searchPrice},000`)
          )
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
          }).format(item.food_price - item.food_discount)
        );
        return priceFilter >= searchPrice1 && priceFilter <= searchPrice2;
      });

      setCurrentItems(arrayTemp);
      renderFullOnPage(arrayTemp);
      setPageCount(Math.ceil(arrayTemp.length / itemsPerPage));
    }

    if (prices.filter((item) => item.isActive === false).length === 5) {
      renderFullOnPage(FoodApi);
      setPageCount(Math.ceil(FoodApi.length / itemsPerPage));
    }
  }, [prices]);

  useEffect(() => {
    /*
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

      
    } else if (type !== undefined) {
      setFillter(
        fillter.filter((item) => item.props.food.food_type === type.type)
      );
    } else {
      setFillter(renderFoodAll());
    }
    */
  }, [prices]);

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
                  onPageChange={(event)=>handlePageClick(event)}
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
        <div
          className={`modal-container ${
            user === null
              ? "min-h-0 text-black w-[350px]"
              : "min-h-[350px] w-[800px]"
          }`}
        >
          <div
            className={`modal-close ${
              user === null ? "text-black" : "text-white"
            }`}
          >
            <AiOutlineClose size={25} />
          </div>

          {user === null ? (
            <>
              <header
                className="modal-header gap-2"
                style={{ background: "white" }}
              >
                <NavLink
                  to={"/login"}
                  className="modal-heading-text text-black text-3xl btn"
                >
                  <span>Đăng nhập</span>
                </NavLink>
              </header>
            </>
          ) : (
            <>
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
                    <img width={200} heihtg={200} src={img_src} alt="" />
                  </div>
                  <div className="flex flex-col ml-4 gap-8 text-3xl justify-center w-full">
                    <h2 className="text-primary-green">
                      Tên: {cart.food_name}
                    </h2>
                    <h3>Mô tả: {cart.food_desc}</h3>
                    <h3>
                      Giá:{" "}
                      {new Intl.NumberFormat("en-IN", {
                        maximumSignificantDigits: 3,
                      }).format(cart.food_price - cart.food_discount)}{" "}
                      VND
                    </h3>
                    <div className="flex gap-4">
                      <label htmlFor="iQuantity">Số lượng:</label>
                      <select
                        onChange={(e) => setCount(e.target.value)}
                        value={count}
                        className="focus px-8 justify-center items-center flex w-1/5"
                        id="iQuantity"
                      >
                        {quantityRender(quantity)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <button
                  className="btn w-full"
                  onClick={(e) => {
                    handleAddToCart(e);
                  }}
                >
                  Thêm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
