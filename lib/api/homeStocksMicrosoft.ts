import { formatDate } from "@/app/types/dateFunctions";


export async function getHomeStocksMicrosoft() {
    
  const apiKey = process.env.STOCKDATA_API_key;
  

  const res = await fetch(
    `https://api.stockdata.org/v1/data/intraday?symbols=MSFT&interval=hour&sort=asc&data_to=${formatDate}&api_token=${apiKey}`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch MSFT data");
  return res.json(); // returns homeStocksApi type
}
