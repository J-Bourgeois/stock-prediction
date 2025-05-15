import HomeStockPricesResponse from "@/components/HomeStockPricesResponse";
import TimeSpanSelector from "@/components/TimeSpanSelector";

export default function Home() {
  return (
    <div className="flex xs:mr-7 min-h-dvh max-w-full w-full flex-col justify-center">
      <h1 className="max-xs:pt-15 pt-3 text-center xs:m-auto">Stock Prediction</h1>
      <div className="absolute top-2 right-18">
        <TimeSpanSelector />
      </div>
      <div className="relative flex flex-col max-w-sm min-w-sm m-auto xs:mr-auto">
        <HomeStockPricesResponse />
      </div>
    </div>
  );
}
