"use client";

/**
 * Component to handle portfolio-specific stock price data.
 * Processes and displays price data for stocks in user's portfolio.
 *
 * Features:
 * - Portfolio-specific data formatting
 * - Performance calculations
 * - Gain/Loss tracking
 * - Historical data presentation
 */

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

import { hydrateHomeStocksNvidia } from "@/store/homeStocksNvidiaSlice";
import { hydrateHomeStocksApple } from "@/store/homeStocksAppleSlice";
import { hydrateHomeStocksMicrosoft } from "@/store/homeStocksMicrosoftSliceSlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { StocksChart } from "./StocksChart";
import { Button } from "./ui/button";
import ResponsiveButton from "./ResponsiveButton";
import { homeStocksApi } from "@/app/types/homeStocksInterface";
import { removePortfolioStock } from "@/actions";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

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
  const hasHydrated = useRef(false);
  const [ollamaResponse, setOllamaResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    if (hasHydrated.current) return;

    switch (stockData.symbol) {
      case "NVDA":
        if (nvidiaStock.data.length > 0) {
          dispatch(hydrateHomeStocksNvidia(nvidiaStock));
        }
        break;
      case "AAPL":
        if (appleStock.data.length > 0) {
          dispatch(hydrateHomeStocksApple(appleStock));
        }
        break;
      case "MSFT":
        if (microsoftStock.data.length > 0) {
          dispatch(hydrateHomeStocksMicrosoft(microsoftStock));
        }
        break;
      default:
        console.warn(`Unsupported Stock Symbol: ${stockData.symbol}`);
    }

    hasHydrated.current = true;
  }, [dispatch, stockData.symbol, nvidiaStock, appleStock, microsoftStock]);

  

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
      <div className="flex justify-between pt-4 w-full">
        <ResponsiveButton
          onClick={async () => {
            setIsLoading(true);
            setOllamaResponse("");
            setShowResponse(true);

            try {
              const res = await fetch("/api/LLM", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ticker: stockData.symbol }),
              });

              if (!res.body) {
                throw new Error("No response stream found");
              }

              const reader = res.body.getReader();
              const decoder = new TextDecoder("utf-8");
              let result = "";

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                result += decoder.decode(value, { stream: true });

                const lines = result.split("\n");
                result = lines.pop()!;

                for (const line of lines) {
                  if (!line.trim()) continue;

                  try {
                    const json = JSON.parse(line);
                    const token = json.response;

                    if (token !== undefined) {
                      setOllamaResponse((prev) => prev + token);
                    }
                  } catch (error) {
                    console.error("Error parsing JSON line:", error, line);
                  }
                }
              }
            } catch (error) {
              console.error("AI request failed:", error);
              setOllamaResponse(
                "Something went wrong while fetching prediction."
              );
            } finally {
              setIsLoading(false);
            }
          }}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild className="max-w-6/12">
            <Button variant="destructive">Remove Stock</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                stock and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    await removePortfolioStock(stockData.symbol);
                    toast.success("Stock successfully removed!");
                  } catch (error) {
                    toast.error("Failed to remove stock");
                  }
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {showResponse && (
        <div className="mt-4 w-full">
          <h3 className="mb-4">{`AI Response for ${stockData.name} :`}</h3>
          {isLoading ? (
            <span>Thinking...</span>
          ) : (
            <div className="bg-card rounded-xl border border-foreground p-2">
              <ReactMarkdown>{ollamaResponse}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
