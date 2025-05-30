"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/Store";

import { hydrateHomeStocksNvidia } from "@/store/homeStocksNvidiaSlice";
import { hydrateHomeStocksApple } from "@/store/homeStocksAppleSlice";
import { hydrateHomeStocksMicrosoft } from "@/store/homeStocksMicrosoftSliceSlice";

import { StocksChart } from "./StocksChart";
import { Button } from "./ui/button";
import { homeStocksApi } from "@/app/types/homeStocksInterface";
import { PayloadAction } from "@reduxjs/toolkit";


interface PortfolioStockProps {
  stockData: {
    symbol: string;
    id: string;
    name: string;
  };
  nvidiaStock: homeStocksApi;
  appleStock: homeStocksApi;
  microsoftStock: homeStocksApi;
}



export default async function PortfolioStockPricesResponse({
  stockData,
  nvidiaStock,
  appleStock,
  microsoftStock
}: PortfolioStockProps) {
    const dispatch = useDispatch<AppDispatch>();

    const nvidiaData = useSelector((state: RootState) => state.homeStocksNvidia);
    const appleData = useSelector((state: RootState) => state.homeStocksApple);
    const microsoftData = useSelector((state: RootState) => state.homeStocksMicrosoft);

    const hydrateIfEmpty = (dataArray: homeStocksApi, action: PayloadAction<homeStocksApi>) => {
        if (dataArray.data.length === 0) dispatch(action);
    }

    useEffect(() => {
        hydrateIfEmpty(nvidiaData, hydrateHomeStocksNvidia(nvidiaStock));
        hydrateIfEmpty(appleData, hydrateHomeStocksApple(appleStock));
        hydrateIfEmpty(microsoftData, hydrateHomeStocksMicrosoft(microsoftStock));
    }, [dispatch, nvidiaStock, appleStock, microsoftStock]);

  return (
    <div className="relative pb-6 min-w-[300px] w-[80vw] max-w-[1200px] flex flex-col text-sm">
      <h2 className="absolute top-2 left-2 max-w-6/12">{stockData.name}</h2>
      <p className="absolute top-2 right-2">
        {stockData.symbol}
      </p>
      <div className="border border-foreground rounded-xl mt-8">
        <StocksChart chartData={homeStocksNvidia} chartConfig={chartConfig} />
      </div>
      <div className="pt-4">
        <Button
          onClick={() => addPortfolioStock(homeStocksNvidia.data[0].ticker)}
        >
          Ask A.I if you should buy this stock!
        </Button>
      </div>
    </div>
  );
}
