import React from "react";
import { useLocation } from "react-router-dom";

function Order() {
  const location = useLocation();
  const totalPriceFood = location.state.totalPriceFood;

  return <div className="my-24">{totalPriceFood}</div>;
}

export default Order;
