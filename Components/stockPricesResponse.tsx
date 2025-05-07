"use client";

import { useEffect, useState } from "react";
import { homeStocksAsync } from "@/store/homeStocksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/Store";

const StockPricesResponse = () => {
  const [loading, setLoading] = useState(true);
  const homeStocks = useSelector((state: RootState) => state.homeStocks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(homeStocksAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-dvh text-center">
      {homeStocks.data.map((stock, index) => {
        return (
          <div className="m-12 border-foreground" key={index}>
            <p>{stock.name}</p>
            <p>{stock.ticker}</p>
            <p>{stock.price}</p>
            <p>{stock.currency}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StockPricesResponse;
