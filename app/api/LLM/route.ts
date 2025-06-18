"use server";

import { fetchNewsData } from "@/lib/fetchStocks";

interface EntitiesData {
  sentiment_score: number;
}

interface NewsData {
  title: string;
  entities: EntitiesData[];
}

interface NewsDataProps {
  meta: {};
  data: NewsData[];
}

export async function POST(req: Request) {
  const { ticker } = await req.json();

  const res: NewsDataProps = await fetchNewsData(ticker);

  const allEntities = res.data.flatMap((article) => article.entities);
  const sumOfScores = allEntities.reduce((sum, entity) => sum + entity.sentiment_score, 0);
  const sentimentScoreMean = sumOfScores / allEntities.length;

  const currentCompanyTone = (scoreMean: number): string => {
    if (scoreMean >= 0.75) {
      return "Very Positive";
    } else if (scoreMean >= 0.5) {
      return "Positive";
    } else if (scoreMean >= 0.25) {
      return "Slightly Positive";
    } else if (scoreMean > -0.25) {
      return "Netural";
    } else if (scoreMean > -0.5) {
      return "Slightly Negative";
    } else if (scoreMean > -0.75) {
      return "Negative";
    } else {
      return "Very Negative";
    }
  };

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
          model: "llama3.2:3b",
          prompt: `You are a financial analysis assistant. Based on the following inputs, determine whether it is a good or bad time to buy the stock. Provide a clear recommendation and a brief explanation based on recent trends and the company's current tone.

            Inputs:

            Ticker Symbol: ${ticker}

            Company Tone: ${currentCompanyTone(sentimentScoreMean)}

            Stock Price Data (Last 30 Days):

            Place stock info here

            Instructions:
            Analyze the trend in the stock price data (e.g., uptrend, downtrend, volatility), and factor in the company tone. Then provide a simple recommendation:
            Buy, Hold, or Avoid.
            Explain your reasoning in 1-2 short sentances.`,
          stream: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const reader = response.body?.getReader();

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        controller.enqueue(value);
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}
