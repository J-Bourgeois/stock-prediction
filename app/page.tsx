import {
  fetchNvidiaStock,
  fetchAppleStock,
  fetchMicrosoftStock,
} from "@/lib/fetchStocks";

import HomeClientPage from "@/components/HomeClientPage";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function Home() {
  try {
  const [nvidiaData, appleData, microsoftData] = await Promise.all([
    fetchNvidiaStock(),
    fetchAppleStock(),
    fetchMicrosoftStock(),
  ]);

  return (
    <HomeClientPage
      nvidiaStock={nvidiaData}
      appleStock={appleData}
      microsoftStock={microsoftData}
    />
  );
} catch (error) {
  console.error('Error fetching Stock Data:', error)
  return (
    <HomeClientPage
      nvidiaStock={{data: [], meta: {} }}
      appleStock={{data: [], meta:{} }}
      microsoftStock={{data: [], meta:{} }}
    />
  )
}
}
