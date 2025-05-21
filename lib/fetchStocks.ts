import { formatDate } from "@/app/types/dateFunctions";

const apiKey = process.env.STOCKDATA_API_KEY;


export async function fetchNvidiaStock() {
  const res = await fetch(`https://api.stockdata.org/v1/data/intraday?symbols=NVDA&interval=hour&sort=asc&data_to=${formatDate}&api_token=${apiKey}`);
  return await res.json();
}

export async function fetchAppleStock() {
  const res = await fetch(`https://api.stockdata.org/v1/data/intraday?symbols=AAPL&interval=hour&sort=asc&data_to=${formatDate}&api_token=${apiKey}`);
  return await res.json();
}

export async function fetchMicrosoftStock() {
  const res = await fetch(`https://api.stockdata.org/v1/data/intraday?symbols=MSFT&interval=hour&sort=asc&data_to=${formatDate}&api_token=${apiKey}`);
  return await res.json();
}
