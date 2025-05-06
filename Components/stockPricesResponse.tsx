"use client";

import { useEffect, useState } from "react";
import { homeStocksAsync } from "@/store/homeStocksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/Store";

interface stockPricesData {
  ticker: string;
  name: string;
  price: number;
  currency: string;
}

const StockPricesResponse = async () => {
  const [response, setResponse] = useState<stockPricesData | null>(null);
  const [loading, setLoading] = useState(true);
  const homeStocks = useSelector((state: RootState) => {});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(homeStocksAsync());
  }, [dispatch]);

  if (loading) {
    return <div>Loading Stock Prices...</div>;
  }

  if (!response) {
    return <div>Error recieving stock prices</div>;
  }

  return <div className="">{}</div>;
};

export default StockPricesResponse;
