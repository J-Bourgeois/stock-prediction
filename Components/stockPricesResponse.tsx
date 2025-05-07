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
          <div
            className="relative text-sm m-12 min-h-3/12 border border-foreground rounded-2xl flex flex-col justify-center items-center"
            key={index}
          >
            <p className="absolute top-2 left-2 max-w-6/12">{stock.name}</p>
            <p className="absolute top-2 right-2">{stock.ticker}</p>
            <p className="max-w-9/12 m-2">{`High: ${stock.day_high}`}</p>
            <p className="max-w-9/12 m-2">{`Low: ${stock.day_low}`}</p>
            <p className="absolute bottom-2">{`${stock.price} ${stock.currency}`}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StockPricesResponse;
