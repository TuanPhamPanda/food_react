import React from "react";
import { FoodApi } from "../../../apis/FoodApi";
import icons from "../../../ultis/icons";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { title } from "../../../ultis/title";

const ListFood = () => {
  document.title = title.listFood;
  const dispatch = useDispatch();
  const { AiTwotoneEdit, AiFillDelete } = icons;

  const handleDeleteFood = (food) => {
    if(window.confirm(`Bạn có chắc muốn xóa sản phẩm có tên ${food.food_name} chứ?`)){
      console.log("Calll api xóa food");
    }
  }

  document.title = "Danh sách món ăn";
  return (
    <div className="list-food">
      <table className="table-food w-full text-xl whitespace-nowrap text-center">
        <thead className="border border-blue-300 border-solid">
          <tr>
            <th>STT</th>
            <th>Tên món ăn</th>
            <th>Giá</th>
            <th className="px-2">Khuyến mãi</th>
            <th className="px-2">Giá được giảm</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Loại</th>
            <th>Danh mục</th>
            <th>Hình ảnh</th>
          </tr>
        </thead>
        <tbody>
          {FoodApi.map((item, index) => (
            <tr key={item.food_id}>
              <td>{index + 1}</td>
              <td>{item.food_name}</td>
              <td>{`${new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(item.food_price)} VND`}</td>
              <td>{`${ ((item.food_discount / item.food_price)*100) === 0 ? "0" : ((item.food_discount / item.food_price)*100).toFixed(3) }%`}</td>
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
                  src={`../../../assets/images/${item.food_src}`}
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
                    <AiFillDelete size={30} onClick={()=>handleDeleteFood(item)}/>
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListFood;
