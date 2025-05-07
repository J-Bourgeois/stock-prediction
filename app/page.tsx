import StockPricesResponse from "@/components/StockPricesResponse";

export default function Home() {
  return (
    <div className="flex min-w-10/12 min-h-dvh flex-col items-center justify-center">
      <h1 className="m-4 text-center">Stock Prediction</h1>
      <div className="flex flex-col w-9/12">
        <StockPricesResponse />
      </div>
    </div>
  );
}
