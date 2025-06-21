"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store 1/store";
import { StocksChart } from "./StocksChart";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { ChartSkeleton } from "./ui/ChartSkeleton";
import { addPortfolioStock } from "@/actions";
import { toast } from "sonner";

interface HomeStockProps {
  isLoggedIn: boolean;
}

const HomeStockPricesResponse = ({ isLoggedIn }: HomeStockProps) => {
  const homeStocksNvidia = useSelector(
    (state: RootState) => state.homeStocksNvidia
  );
  const homeStocksApple = useSelector(
    (state: RootState) => state.homeStocksApple
  );
  const homeStocksMicrosoft = useSelector(
    (state: RootState) => state.homeStocksMicrosoft
  );

  if (
    !homeStocksNvidia.data.length ||
    !homeStocksApple.data.length ||
    !homeStocksMicrosoft.data.length
  ) {
    return (
      <div className="flex flex-col min-w-full w-full text-center items-center">
        <div className="relative pb-6 min-w-[300px] w-[80vw] max-w-[1200px] flex flex-col text-sm">
          <ChartSkeleton />
        </div>
        <div className="relative pb-6 min-w-[300px] w-[80vw] max-w-[1200px] flex flex-col text-sm">
          <ChartSkeleton />
        </div>
        <div className="relative flex flex-col min-w-[300px] w-[80vw] max-w-[1200px] text-sm mb-12">
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  const chartConfig = {
    ticker: {
      label: "Placeholder",
      color: "#2563eb",
    },
  };

  return (
    <div className="flex flex-col min-w-full w-full text-center items-center">
      <div className="relative pb-6 min-w-[300px] w-[80vw] max-w-[1200px] flex flex-col text-sm">
        <h2 className="absolute top-2 left-2 max-w-6/12">Nvidia Corporation</h2>
        <p className="absolute top-2 right-2">
          {homeStocksNvidia.data[0].ticker}
        </p>
        <div className="border border-foreground rounded-xl mt-8">
          <StocksChart chartData={homeStocksNvidia} chartConfig={chartConfig} />
        </div>
        <div className="pt-4">
          <Button
            onClick={async () => {
              if (isLoggedIn) {
                try {
                  await addPortfolioStock(homeStocksNvidia.data[0].ticker);
                  toast.success("Stock added to portfolio!");
                } catch (error) {
                  toast.error("Failed to add stock");
                }
              } else {
                toast("Please log in to add stock to portfolio");
              }
            }}
          >
            <Plus /> Add stock to Portfolio
          </Button>
        </div>
      </div>
      <div className="relative pb-6 min-w-[300px] w-[80vw] max-w-[1200px] flex flex-col text-sm">
        <h2 className="absolute top-2 left-2 max-w-6/12">Apple Inc.</h2>
        <p className="absolute top-2 right-2 ">
          {homeStocksApple.data[0].ticker}
        </p>
        <div className="border border-foreground rounded-xl mt-8">
          <StocksChart chartData={homeStocksApple} chartConfig={chartConfig} />
        </div>
        <div className="pt-4">
          <Button
            onClick={async () => {
              if (isLoggedIn) {
                try {
                  addPortfolioStock(homeStocksApple.data[0].ticker);
                  toast.success("Stock added to portfolio!");
                } catch (error) {
                  toast.error("Failed to add stock");
                }
              } else {
                toast("Please log in to add stock to portfolio");
              }
            }}
          >
            <Plus /> Add stock to Portfolio
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col min-w-[300px] w-[80vw] max-w-[1200px] text-sm mb-12">
        <h2 className="absolute top-2 left-2 max-w-6/12">Microsoft</h2>
        <p className="absolute top-2 right-2">
          {homeStocksMicrosoft.data[0].ticker}
        </p>
        <div className="border border-foreground rounded-xl mt-8">
          <StocksChart
            chartData={homeStocksMicrosoft}
            chartConfig={chartConfig}
          />
        </div>
        <div className="pt-4">
          <Button
            onClick={async () => {
              if (isLoggedIn) {
                try {
                  addPortfolioStock(homeStocksMicrosoft.data[0].ticker);
                  toast.success("Stock added to portfolio!");
                } catch (error) {
                  toast.error("Failed to add stock");
                }
              } else {
                toast("Please log in to add stock to portfolio");
              }
            }}
          >
            <Plus /> Add stock to Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeStockPricesResponse;
