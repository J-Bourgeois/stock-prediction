"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/Store";

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

const chartConfig = {
  ticker: {
    label: "Placeholder",
    color: "#2563eb",
  },
};

export default function PortfolioStockPricesResponse({
  stockData,
  nvidiaStock,
  appleStock,
  microsoftStock,
}: PortfolioStockProps) {
  const dispatch = useDispatch<AppDispatch>();

  const hydrateIfEmpty = (() => {
    let hasHydrated = false;

    return ((dataArray: homeStocksApi, action: (data: homeStocksApi) => PayloadAction<homeStocksApi>) => {
      if (!hasHydrated && dataArray.data.length > 0) {
        hasHydrated = true;
        return dispatch(action(dataArray))
      }
    })
  })();

  useEffect(() => {
    hydrateIfEmpty(nvidiaStock, hydrateHomeStocksNvidia);
    hydrateIfEmpty(appleStock, hydrateHomeStocksApple);
    hydrateIfEmpty(microsoftStock, hydrateHomeStocksMicrosoft);
  }, [dispatch, nvidiaStock, appleStock, microsoftStock]);

  return (
    <div className="relative pb-6 min-w-[300px] w-[80vw] max-w-[1200px] flex flex-col text-sm">
      <h2 className="absolute top-2 left-2 max-w-6/12">{stockData.name}</h2>
      <p className="absolute top-2 right-2">{stockData.symbol}</p>
      <div className="border border-foreground rounded-xl mt-8">
        <StocksChart
          chartData={
            stockData.symbol === "NVDA"
              ? nvidiaStock
              : stockData.symbol === "AAPL"
              ? appleStock
              : stockData.symbol === "MSFT"
              ? microsoftStock
              : { meta: { date_from: "", date_to: "" }, data: [] }
          }
          chartConfig={chartConfig}
        />
      </div>
      <div className="pt-4">
        <Button>
          Ask A.I if you should buy this stock!
        </Button>
      </div>
    </div>
  );
}
