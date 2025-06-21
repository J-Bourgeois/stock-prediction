"use client";

import { homeStocksApi } from "@/app/types/homeStocksInterface";
import TimeSpanSelector from "./TimeSpanSelector";
import PortfolioStockPricesResponse from "./PortfolioStockPricesResponse";

interface Stock {
  symbol: string;
  id: string;
  name: string;
}

interface PortfolioStockProps {
  userData: {
    email: string;
    Portfolio: {
      stockSelections: {
        stock: Stock;
      }[];
    }[];
  } | null;
  nvidiaStock: homeStocksApi;
  appleStock: homeStocksApi;
  microsoftStock: homeStocksApi;
}

export function PortfolioWrapper({
  userData,
  nvidiaStock,
  appleStock,
  microsoftStock,
}: PortfolioStockProps) {
  return (
    <div className="flex xs:mr-7 min-h-screen max-w-full w-full flex-col items-center">
      <h1 className="max-sm:pt-15 absolute -translate-x-1/2 left-6/12 top-3 pb-6 text-center xs:m-auto">
        My Portfolio
      </h1>
      <div className="absolute top-2 right-18">
        <TimeSpanSelector />
      </div>
      <div className="relative flex flex-col xs:w-9/12 max-xs:min-w-sm mt-36">
        <div className="flex flex-col min-w-full w-full text-center items-center">
          {userData?.Portfolio &&
          userData.Portfolio[0]?.stockSelections.length > 0 ? (
            userData.Portfolio[0].stockSelections.map((stockSelection) => (
              <PortfolioStockPricesResponse
                key={stockSelection.stock.id}
                stockData={stockSelection.stock}
                nvidiaStock={nvidiaStock}
                appleStock={appleStock}
                microsoftStock={microsoftStock}
              />
            ))
          ) : (
            <p className="p-6 m-auto text-slate-400">
              Oops! Looks like you don't have any stocks in your portfolio! Go
              to the home page to add some!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
