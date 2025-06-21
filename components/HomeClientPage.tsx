"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateHomeStocksNvidia } from "@/store/homeStocksNvidiaSlice";
import { hydrateHomeStocksApple } from "@/store/homeStocksAppleSlice";
import { hydrateHomeStocksMicrosoft } from "@/store/homeStocksMicrosoftSliceSlice";
import HomeStockPricesResponse from "@/components/HomeStockPricesResponse";
import TimeSpanSelector from "@/components/TimeSpanSelector";
import { AppDispatch } from "@/store/store";
import { homeStocksApi } from "@/app/types/homeStocksInterface";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

interface Props {
  nvidiaStock: homeStocksApi;
  appleStock: homeStocksApi;
  microsoftStock: homeStocksApi;
  isLoggedIn: boolean;
}

export default function HomeClientPage({
  nvidiaStock,
  appleStock,
  microsoftStock,
  isLoggedIn,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(hydrateHomeStocksNvidia(nvidiaStock));
    dispatch(hydrateHomeStocksApple(appleStock));
    dispatch(hydrateHomeStocksMicrosoft(microsoftStock));
  }, [nvidiaStock, appleStock, microsoftStock, dispatch]);

  return (
    <div className="flex xs:mr-7 min-h-screen max-w-full w-full flex-col items-center">
      <h1 className="max-sm:pt-15 absolute -translate-x-1/2 left-6/12 top-3 pb-6 text-center xs:m-auto">
        Stock Prediction
      </h1>
      <div className="absolute top-2 right-18">
        <TimeSpanSelector />
      </div>
      {!isLoggedIn ? (
        <div className="absolute top-2 left-14 w-[100px]">
          <Button variant="outline" onClick={() => redirect("/signup")}>
            Sign Up
          </Button>
        </div>
      ) : null}
      <div className="relative flex flex-col xs:w-9/12 max-xs:min-w-sm mt-36">
        <HomeStockPricesResponse isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}
