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
  const [error, setError] = useState<string | null>(null);
  
  const homeStocksNvidia = useSelector((state: RootState) => state.homeStocksNvidia);
  const homeStocksApple = useSelector((state: RootState) => state.homeStocksApple);
  const homeStocksMicrosoft = useSelector((state: RootState) => state.homeStocksMicrosoft);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        
        const results = await Promise.all([
          dispatch(homeStocksNvidiaAsync()).unwrap(),
          dispatch(homeStocksAppleAsync()).unwrap(), 
          dispatch(homeStocksMicrosoftAsync()).unwrap()
        ]);

        console.log('API Results:', results);
      } catch (err) {
        console.error('Failed to fetch stock data:', err);
        setError('Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!homeStocksNvidia.data.length || !homeStocksApple.data.length || !homeStocksMicrosoft.data.length) {
    return <div>No data available</div>;
  }

  const chartConfig = {
    ticker: {
      label: "Placeholder",
      color: "#2563eb",
    },
  };

  return (
    <div className="flex flex-col h-dvh min-w-full text-center justify-center">
      {/* {homeStocksNvidia.data.map((stock, index) => {
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
      <div className="relative m-auto min-w-9/12 w-9/12 flex flex-col text-sm">
        <h2 className="absolute top-2 left-2 max-w-6/12">Nvidia Corporation</h2>
        <p className="absolute top-2 right-2">
          {homeStocksNvidia.data[0].ticker}
        </p>
        <div className="border border-foreground rounded-xl mt-8">
          <StocksChart chartData={homeStocksNvidia} chartConfig={chartConfig} />
        </div>
      </div>
      <div className="relative m-auto min-w-9/12 w-9/12 flex flex-col ">
        <h2 className="absolute top-2 left-2 max-w-6/12">Apple Inc.</h2>
        <p className="absolute top-2 right-2 ">
          {homeStocksApple.data[0].ticker}
        </p>
        <div className="border border-foreground rounded-xl mt-8">
          <StocksChart chartData={homeStocksApple} chartConfig={chartConfig} />
        </div>
      </div>
      <div className="relative m-auto flex flex-col min-w-9/12 w-9/12">
        <h2 className="absolute top-2 left-2 max-w-6/12">
          Microsoft Corporation
        </h2>
        <p className="absolute top-2 right-2">
          {homeStocksMicrosoft.data[0].ticker}
        </p>
        <div className="border border-foreground rounded-xl mt-8">
          <StocksChart
            chartData={homeStocksMicrosoft}
            chartConfig={chartConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeStockPricesResponse;
