export const dynamic = "force-dynamic";

import {
  fetchNvidiaStock,
  fetchAppleStock,
  fetchMicrosoftStock,
} from "@/lib/fetchStocks";

import HomeClientPage from "@/components/HomeClientPage";

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
    console.error("Error fetching Stock Data:", error);
    return (
      <HomeClientPage
        nvidiaStock={{
          data: [],
          meta: {
            date_from: "",
            date_to: "",
          },
        }}
        appleStock={{
          data: [],
          meta: {
            date_from: "",
            date_to: "",
          },
        }}
        microsoftStock={{
          data: [],
          meta: {
            date_from: "",
            date_to: "",
          },
        }}
      />
    );
  }
}
