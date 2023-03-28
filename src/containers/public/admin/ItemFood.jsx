import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import icons from "../../../ultis/icons";

const ItemFood = ({item, index, onDeleteFood}) => {
  const { AiTwotoneEdit, AiFillDelete } = icons;
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{item.food_name}</td>
        <td>{`${new Intl.NumberFormat("en-IN", {
          maximumSignificantDigits: 3,
        }).format(item.food_price)} VND`}</td>
        <td>{`${
          (item.food_discount / item.food_price) * 100 === 0
            ? "0"
            : ((item.food_discount / item.food_price) * 100).toFixed(3)
        }%`}</td>
        <td>{`${new Intl.NumberFormat("en-IN", {
          maximumSignificantDigits: 3,
        }).format(item.food_discount)} VND`}</td>
        <td>{item.food_desc}</td>
        <td>{item.food_status}</td>
        <td>{item.food_type}</td>
        <td>{item.food_category}</td>
        <td>
          <img
            className="w-[100px] h-[100px] m-auto"
            src={`${process.env.REACT_APP_FOOD_API}/images/${item.food_src}`}
            alt=""
          />
        </td>
        <td>
          <div className="flex justify-center gap-4 items-center">
            <span>
              <NavLink to={`/admin/editFood/${item.food_id}`}>
                <AiTwotoneEdit size={30} />
              </NavLink>
            </span>
            <span>
              <AiFillDelete size={30} onClick={() => onDeleteFood(item)} />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default memo(ItemFood);
