import StockPricesResponse from "@/components/StockPricesResponse";

export default function Home() {
  return (
    <div className="flex my-auto min-h-dvh min-w-full flex-col justify-center">
      <h1 className="mt-4 text-center">Stock Prediction</h1>
      <div className="flex flex-col">
        <StockPricesResponse />
      </div>
    </div>
  );
}
