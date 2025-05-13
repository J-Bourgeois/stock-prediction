"use client";

import { useEffect, useState } from "react";
import { homeStocksNvidiaAsync } from "@/store/homeStocksNvidiaSlice";
import { homeStocksAppleAsync } from "@/store/homeStocksAppleSlice";
import { homeStocksMicrosoftAsync } from "@/store/homeStocksMicrosoftSliceSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/Store";
import { StocksChart } from "./StocksChart";

const HomeStockPricesResponse = () => {
  const [loading, setLoading] = useState(true);
  const homeStocksNvidia = useSelector((state: RootState) => state.homeStocksNvidia);
  const homeStocksApple = useSelector((state: RootState) => state.homeStocksApple);
  const homeStocksMicrosoft = useSelector((state: RootState) => state.homeStocksMicrosoft);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(homeStocksNvidiaAsync());
    dispatch(homeStocksAppleAsync());
    dispatch(homeStocksMicrosoftAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-dvh min-w-full text-center justify-center">
      { /* {homeStocksNvidia.data.map((stock, index) => {
        return (
          <div
            className="relative text-sm m-auto min-h-3/12 min-w-9/12 border border-foreground rounded-2xl flex flex-col justify-center items-center"
            key={index}
          >
            <p className="absolute top-2 left-2 max-w-6/12">{'Nvidia Corporation'}</p>
            <p className="absolute top-2 right-2">{stock.ticker}</p>
            <p className="absolute bottom-2">{`${stock.data.close}`}</p>
          </div>
        );
      })} */}
      {}
      {}
      {}
      <StocksChart />
      
    </div>
  );
};

export default HomeStockPricesResponse;
