import React, { memo } from "react";
import icons from "../ultis/icons";

const { BsStarFill, BsStarHalf, AiOutlineStar } = icons;

function Food({ food, cart }) {
  const handleCart = (food) => {
    cart(food);

    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector(".modal-close");

    modalClose.addEventListener("click", hideModal);
    function hideModal() {
      modal.classList.remove("open");
    }

    modal.addEventListener("click", hideModal);
    modal.classList.add("open");

    const modalContainer = document.querySelector(".modal-container").childNodes;

    for (let index = 0; index < modalContainer.length; index++) {
      if (index !== modalContainer.length - 1) {
        modalContainer[index].addEventListener("click", (event) => {
          event.stopPropagation();
        });
      }
    }
  };

  let img_src = `${process.env.REACT_APP_FOOD_IMAGE}/${food.food_src}`;

  let startFull = [];
  let startHaft = food.food_star?.split(".")[1];
  for (let i = 0; i < food.food_star?.split(".")[0]; i++) {
    startFull.push(<BsStarFill />);
  }

  if (startHaft !== undefined) {
    startFull.push(<BsStarHalf />);
  }

  if (startFull.length === 0) {
    startFull.push(<AiOutlineStar />);
    startFull.push(<AiOutlineStar />);
    startFull.push(<AiOutlineStar />);
    startFull.push(<AiOutlineStar />);
    startFull.push(<AiOutlineStar />);
  }

  return (
    <>
      <div className="box">
        <div className="image">
          <img src={img_src} alt="banhmi1x" />
        </div>
        <div className="content">
          <h3>{food.food_name}</h3>
          <div className="stars gap-1 flex justify-center items-center">
            {startFull.map((item, index) => (
              <div key={index} className="inline-block">
                {item}
              </div>
            ))}

            <span className="pl-1">{food.food_vote}</span>
          </div>
          <div className="desc">
            <p>{food.food_desc}</p>
          </div>
          <div className="price">
            {food.food_discount === "0.00" ? (
              <>
                <p>
                  {`Giá: ${new Intl.NumberFormat("en-IN", {
                    maximumSignificantDigits: 3,
                  }).format(food.food_price)} VND`}
                </p>
              </>
            ) : (
              <>
                <p>
                  {`
                  Giá: ${new Intl.NumberFormat("en-IN", {
                    maximumSignificantDigits: 3,
                  }).format(food.food_price - food.food_discount)} VND`}
                </p>
                <span>
                  {`Giá gốc: ${new Intl.NumberFormat("en-IN", {
                    maximumSignificantDigits: 3,
                  }).format(food.food_price)} VND`}
                </span>
              </>
            )}
          </div>
          <button onClick={() => handleCart(food)} className="btn">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </>
  );
}

export default memo(Food);
