import HomeStockPricesResponse from "@/components/HomeStockPricesResponse";
import TimeSpanSelector from "@/components/TimeSpanSelector";

export default function Home() {
  return (
    <div className="flex xs:mr-7 min-h-dvh h-dvh max-w-full w-full flex-col items-center">
      <h1 className="max-sm:pt-15 absolute -translate-x-1/2 left-6/12 top-3 pb-6 text-center xs:m-auto">
        Stock Prediction
      </h1>
      <div className="absolute top-2 right-18">
        <TimeSpanSelector />
      </div>
      <div className="relative flex flex-col xs:w-9/12 max-xs:min-w-sm mt-36">
        <HomeStockPricesResponse />
      </div>
    </div>
  );
}
