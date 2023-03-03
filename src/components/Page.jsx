import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Menu from "../containers/public/Menu";
import icons from "../ultis/icons";

const { AiOutlineArrowLeft, AiOutlineArrowRight } = icons;
function Page() {
  const items = foods;

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Menu currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<AiOutlineArrowRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<AiOutlineArrowLeft />}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Page;
