import { PortfolioPage } from "@/components/PortfolioPage";
import {
  fetchNvidiaStock,
  fetchAppleStock,
  fetchMicrosoftStock,
} from "@/lib/fetchStocks";

export default async function portfolio() {
  try {
    const [nvidiaData, appleData, microsoftData] = await Promise.all([
      fetchNvidiaStock(),
      fetchAppleStock(),
      fetchMicrosoftStock(),
    ]);

    return (
      <PortfolioPage
        nvidiaStock={nvidiaData}
        appleStock={appleData}
        microsoftStock={microsoftData}
      />
    );
  } catch (error) {
    console.error(`Error fetching stock Data:`, error);
    return (
      <PortfolioPage
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
