import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { menuFood } from "../../../ultis/menus";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import {title} from "../../../ultis/title";

const AddFood = () => {

  document.title = title.addFood;
  const [error, setError] = useState("");
  const [imageFood, setImageFood] = useState();
  const [sta, setSta] = useState([]);
  const [type, setType] = useState(1);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [promotion, setPromotion] = useState(0);
  const [foodDiscount, setFoodDiscount] = useState(0);
  const [foodDescription, setFoodDescription] = useState("");
  const [foodCategory, setFoodCategory] = useState(
    menuFood.filter((item) => !item.end)[0].text
  );
  const VND = new Intl.NumberFormat();

  const status = [
    { id: 1, text: "Bán Chạy nhất", value: "best seller" },
    { id: 2, text: "Bán Online", value: "online only" },
    { id: 3, text: "Món Ăn Theo Mùa", value: "seasonal dishes" },
    { id: 4, text: "Món Mới", value: "new dishes" },
  ];
  
  const types = [
    { id: 1, type: "Mặn" },
    { id: 2, type: "Chay" },
  ];

  const handleCheckedStatus = (value) => {
    setSta((prev) => {
      const isChecked = sta.includes(value);

      if (isChecked) {
        return sta.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleChooseImageFood = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImageFood(file);
  };

  const handleAddFood = (e) => {
    if (
      foodName.length === 0 ||
      foodPrice.length === 0 ||
      foodDescription.length === 0 ||
      imageFood === undefined
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
    } else {
      setError("");
      const food = {
        food_name: foodName,
        food_star: "",
        food_vote: "",
        food_price: foodPrice,
        food_discount: foodDiscount,
        food_desc: foodDescription,
        food_status: sta.length === 0 ? "normal": sta.toString().replaceAll(',', ' '),
        food_type: types.find((item) => item.id === type).type,
        food_category: foodCategory,
        food_src: imageFood.name,
      };
      let formData = new FormData();

      formData.append("food", JSON.stringify(food));
      formData.set("food_src", imageFood);

      toast.success('THêm thành công');

      /*
      axios({
        method: "post",
        url: "http://localhost:8081/api/foods",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
        */
    }
  };

  useEffect(() => {
    return () => {
      imageFood && URL.revokeObjectURL(imageFood.preview);
    };
  }, [imageFood]);

  useEffect(() => {
    setFoodDiscount(VND.format(foodPrice - (foodPrice * promotion) / 100));
  }, [promotion, foodPrice]);

  return (
    <div className="list-food">
      <div className="add-food">
        <div className="item">
          <div className="flex justify-between">
            <label htmlFor="food_name">Tên món ăn: </label>
            <input
              onChange={(e) => setFoodName(e.target.value)}
              value={foodName}
              type="text"
              className="focus"
              id="food_name"
              name="food_name"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <label htmlFor="food_price">Giá: </label>
              <input
                onChange={(e) => {
                  let price = e.target.value.replaceAll(",", "");
                  if (price >= 0 && price <= 1000000) {
                    setFoodPrice(price);
                  }
                }}
                type="text"
                value={VND.format(foodPrice)}
                name="food_price"
                className="focus flex-none min-w-[320px] text-center pr-4"
                id="food_price"
              />
            </div>
          </div>
          <div>
            <label htmlFor="promotion">Phần trăm KM: </label>
            <input
              type="number"
              onChange={(e) => {
                let prom = e.target.value;
                if (prom >= 0 && prom <= 100) {
                  setPromotion(prom);
                }
              }}
              id="promotion"
              value={VND.format(promotion)}
              className="focus ml-8 text-center"
            />
          </div>
        </div>
        <div className="item">
          <div className="flex justify-between">
            <label htmlFor="food_discount">Giá đã KM: </label>
            <input
              value={foodDiscount}
              type="text"
              id="food_discount"
              name="food_discount"
              className="focus h-fit"
              disabled={true}
            />
          </div>
          <div className="flex">
            <div className="flex-none">
              <label htmlFor="food_desc">Mô tả</label>
            </div>
            <textarea
              className="focus ml-8 h-full w-full"
              onChange={(e) => setFoodDescription(e.target.value)}
              value={foodDescription}
              type="text"
              id="food_desc"
              name="food_desc"
            />
          </div>
          <div className="flex gap-8">
            <h2>Trạng thái</h2>
            <div className="flex flex-col gap-2">
              {status.map((item) => (
                <label
                  htmlFor={item.value}
                  key={item.id}
                  className="cursor-pointer flex gap-4"
                >
                  <input
                    onChange={() => handleCheckedStatus(item.value)}
                    id={item.value}
                    type="checkbox"
                    checked={sta.includes(item.value)}
                  />
                  {item.text}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="item">
          <div className="flex gap-8 items-center">
            <h2>Loại </h2>
            {types.map((item) => (
              <label
                htmlFor={item.id}
                key={item.id}
                className="cursor-pointer flex gap-4"
              >
                <input
                  type="radio"
                  id={item.id}
                  onChange={() => setType(item.id)}
                  checked={type === item.id}
                />
                {item.type}
              </label>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <h2>Danh mục</h2>
            <select
              onChange={(e) => setFoodCategory(e.target.value)}
              value={foodCategory}
              className="border border-blue-300 border-solid"
              id="food_category"
            >
              {menuFood
                .filter((item) => !item.end)
                .map((item, index) => (
                  <option key={index} value={item.text}>
                    {item.text}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="item">
          <div className="flex items-center gap-4">
            <span className="flex-none">Chọn hình</span>

            <input
              multiple
              accept="image/*"
              type="file"
              className="w-[220px]"
              onChange={(e) => handleChooseImageFood(e)}
            />

            {imageFood && (
              <img src={imageFood.preview} width={150} height={150} alt="" />
            )}
          </div>
        </div>
        <span className="flex text-red-400 w-full">{error}</span>
        <div className="w-full flex justify-center">
          <button onClick={(e) => handleAddFood(e)} className="btn mt-4 w-1/2">
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
