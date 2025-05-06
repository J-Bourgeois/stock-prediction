import StockPricesResponse from "@/components/stockPricesResponse";

export default function Home() {
  return (
    <div className="flex min-w-10/12 min-h-10/12 flex-col items-center">
      <h1 className="m-4">Stock Prediction</h1>
      <div className="flex w-9/12 overflow-scroll">
        <StockPricesResponse />
      </div>
    </div>
  );
}
