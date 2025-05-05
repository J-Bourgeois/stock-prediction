import { useEffect, useState } from "react";

interface stockPricesData {
  ticker: string;
  currentPrice: number;
  currency: string;
}

const stockPricesResponse = () => {
  const [response, setResponse] = useState<stockPricesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const response = await fetch("/api/stockPrices", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data: stockPricesData = await response.json();
        setResponse(data);
      } catch (error) {
        setResponse(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStockPrices();
  }, []);

  const homeStocks = () => {}

  if (loading) {
    return <div>Loading Stock Prices...</div>
  }

  if (!response) {
    return <div>Error recieving stock prices</div>
  }


  return (
  <div className="">
    {}
  </div>
);
};

export default stockPricesResponse;
