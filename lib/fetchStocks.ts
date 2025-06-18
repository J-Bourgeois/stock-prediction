import { formatDate } from "@/app/types/dateFunctions";

const apiKey = process.env.STOCKDATA_API_KEY;

export async function fetchNvidiaStock() {
  const res = await fetch(
    `https://api.stockdata.org/v1/data/intraday?symbols=NVDA&interval=hour&sort=asc&data_to=${formatDate}&api_token=${apiKey}`,
    { next: { revalidate: 3600 } }
  );
  return await res.json();
}

export async function fetchAppleStock() {
  const res = await fetch(
    `https://api.stockdata.org/v1/data/intraday?symbols=AAPL&interval=hour&sort=asc&data_to=${formatDate}&api_token=${apiKey}`,
    { next: { revalidate: 3600 } }
  );
  return await res.json();
}

export async function fetchMicrosoftStock() {
  const res = await fetch(
    `https://api.stockdata.org/v1/data/intraday?symbols=MSFT&interval=hour&sort=asc&data_to=${formatDate}&api_token=${apiKey}`,
    { next: { revalidate: 3600 } }
  );
  return await res.json();
}

export async function fetchNewsData(stockTicker: string) {
  const res = await fetch(`https://api.stockdata.org/v1/news/all?symbols=${stockTicker}&language=en&filter_entities=true&api_token=${apiKey}`, 
    { next: { revalidate: 3600 } }
  );
  return await res.json();
}
