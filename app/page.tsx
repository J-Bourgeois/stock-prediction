import StockPricesResponse from "@/components/StockPricesResponse";

export default function Home() {
  return (
    <div className="flex xs:mr-7 min-h-dvh max-w-full w-full flex-col justify-center">
      <h1 className="mt-4 text-center xs:m-auto">Stock Prediction</h1>
      <div className="flex flex-col max-w-sm min-w-sm m-auto xs:mr-auto">
        <StockPricesResponse />
      </div>
    </div>
  );
}
