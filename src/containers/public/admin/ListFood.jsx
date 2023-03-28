import React, { useEffect, useState } from "react";
import icons from "../../../ultis/icons";
import { title } from "../../../ultis/title";
import { deleteFood, showFoods } from "../../../apis";
import ReactPaginate from "react-paginate";
import ItemFood from "./ItemFood";

const {AiOutlineArrowLeft, AiOutlineArrowRight} = icons;
const ListFood = () => {
  const itemsPerPage = 10;
  document.title = title.listFood;
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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % FoodApi.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = FoodApi.slice(itemOffset, endOffset);
    setPageCount(Math.ceil(FoodApi.length / itemsPerPage));
    setCurrentItems(currentItems);
  }, [FoodApi]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = FoodApi.slice(itemOffset, endOffset);
    setCurrentItems(currentItems);
  }, [itemOffset]);

  useEffect(() => {
    apiFood();
  }, []);


  const handleDeleteFood = (food) => {
    if (
      window.confirm(
        `Bạn có chắc muốn xóa sản phẩm có tên ${food.food_name} chứ?`
      )
    ) {
      deleteFood(food.food_id).then((data) => {
        if (data.status === 200) {
          apiFood();
        }
      });
    }
  };

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
          {currentItems.map((item, index) => (
            <ItemFood key={item.food_id} item={item} index={index} onDeleteFood = {handleDeleteFood} />
          ))}
        </tbody>
      </table>

      <div id="page" className="mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiOutlineArrowRight size={30} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          className="flex gap-6 justify-center items-center cursor-default"
          pageClassName="text-2xl p-4"
          activeClassName="bg-main-primary-orange text-white"
          pageCount={pageCount}
          disabledClassName="opacity-20"
          disabledLinkClassName="cursor-default"
          previousLabel={<AiOutlineArrowLeft size={30} />}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default ListFood;
