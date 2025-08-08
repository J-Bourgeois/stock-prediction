/**
 * 
 * 
 * Github Copilot was used to help create API route for targeting local LLM with Ollama
 * 
 * LLM-based Stock Analysis API Route
 * 
 * This server-side API endpoint provides AI-powered stock analysis using Ollama LLM.
 * It combines technical analysis with sentiment analysis to generate trading recommendations.
 * 
 * Key Features:
 * - Real-time stock data processing
 * - News sentiment analysis
 * - Technical indicators calculation
 * - Streaming LLM responses
 * 
 * Data Processing:
 * 1. Fetches and analyzes news sentiment
 * 2. Retrieves historical stock prices
 * 3. Calculates technical indicators
 * 4. Generates AI-based recommendations
 * 
 * Technical Indicators:
 * - Price change percentage
 * - Linear regression trend
 * - Price volatility
 * - Short-term MA (30-day)
 * - Long-term MA (180-day)
 * 
 * Dependencies:
 * - Requires Ollama running locally on port 11434
 * - Uses llama3.2:3b model
 * - Needs access to stock and news data APIs
 */

"use server";

import { fetchNewsData, fetchStockClosingPrices } from "@/lib/fetchStocks";

/**
 * Interface for sentiment data from news entities
 * @property sentiment_score - Numerical score indicating sentiment (-1 to 1)
 */
interface EntitiesData {
  sentiment_score: number;
}

/**
 * Interface for news article data
 * @property title - Article headline
 * @property entities - Array of sentiment scores for entities mentioned
 */
interface NewsData {
  title: string;
  entities: EntitiesData[];
}

interface NewsDataProps {
  meta: {};
  data: NewsData[];
}

interface ClosingPrices {
  close: number;
}

interface ClosingPricesProps {
  meta: {};
  data: ClosingPrices[];
}

/**
 * Stock price summary interface
 * Contains calculated technical indicators and trend metrics
 */
interface StockSummary {
  overallChangePercent: string;
  averageDailyTrend: string;
  volatility: string;
  shortTermMA: string;
  longTermMA: string;
}

/**
 * Main API route handler for stock analysis
 * @param req - Request object containing ticker symbol
 * @returns Streaming response with AI-generated analysis
 */
export async function POST(req: Request): Promise<Response> {
  const { ticker } = await req.json();
  if (!ticker) {
    return new Response("Ticker not provided", { status: 400 });
  }

  const newsRes: NewsDataProps = await fetchNewsData(ticker);
  const closeRes: ClosingPricesProps = await fetchStockClosingPrices(ticker);

  const allEntities = newsRes.data.flatMap((article) => article.entities);
  const sumOfScores = allEntities.reduce(
    (sum, entity) => sum + entity.sentiment_score,
    0
  );
  const sentimentScoreMean = sumOfScores / allEntities.length;

  /**
   * Sentiment Analysis Helper
   * Converts numerical sentiment scores to categorical assessments
   * Scale:
   * - Very Positive: >= 0.75
   * - Positive: >= 0.50
   * - Slightly Positive: >= 0.25
   * - Neutral: > -0.25
   * - Slightly Negative: > -0.50
   * - Negative: > -0.75
   * - Very Negative: <= -0.75
   */
  const currentCompanyTone = (scoreMean: number): string => {
    if (scoreMean >= 0.75) {
      return "Very Positive";
    } else if (scoreMean >= 0.5) {
      return "Positive";
    } else if (scoreMean >= 0.25) {
      return "Slightly Positive";
    } else if (scoreMean > -0.25) {
      return "Neutral";
    } else if (scoreMean > -0.5) {
      return "Slightly Negative";
    } else if (scoreMean > -0.75) {
      return "Negative";
    } else {
      return "Very Negative";
    }
  };

  const allClosingPrices = closeRes.data.map((price) => price.close);

  /**
   * Technical Analysis Function
   * Calculates key technical indicators from historical price data:
   * 1. Overall price change (percentage)
   * 2. Trend direction using linear regression
   * 3. Price volatility (average deviation)
   * 4. Moving averages (short and long term)
   * 
   * @param closingPrices - Array of historical closing prices
   * @returns StockSummary object with calculated metrics
   * @throws Error if insufficient data points
   */
  function summarizeStockTrends(closingPrices: number[]): StockSummary {
    const length = closingPrices.length;
    if (length < 2) {
      throw new Error("Need at least 2 data points");
    }

    // Overall % Change
    const start = closingPrices[0];
    const end = closingPrices[length - 1];
    const overallChangePercent = ((end - start) / start) * 100;

    // Slope / Calculating Best-fit-Line
    const xIndices = Array.from({ length: length }, (_, i) => i);
    const xMean = xIndices.reduce((sum, val) => sum + val, 0) / length;
    const yMean = closingPrices.reduce((sum, val) => sum + val, 0) / length;

    const slopeNumerator = xIndices.reduce(
      (sum, xi, i) => sum + (xi - xMean) * (closingPrices[i] - yMean),
      0
    );
    const slopeDenominator = xIndices.reduce(
      (sum, xi) => sum + Math.pow(xi - xMean, 2),
      0
    );
    const slope = slopeNumerator / slopeDenominator;

    // Volatility (Average deviation from the Mean)

    const volatility =
      closingPrices.reduce((sum, price) => sum + Math.abs(price - yMean), 0) /
      length;

    // Moving Averages
    const shortMA =
      closingPrices.slice(-30).reduce((sum, price) => sum + price, 0) / 30;
    const longMA = yMean;

    return {
      overallChangePercent: overallChangePercent.toFixed(2),
      averageDailyTrend: slope.toFixed(4),
      volatility: volatility.toFixed(2),
      shortTermMA: shortMA.toFixed(2),
      longTermMA: longMA.toFixed(2),
    };
  }

  const summary = summarizeStockTrends(allClosingPrices);

  const stockSummaryText = `
   Summary of Last 180 Days:
   - Overall Change: ${summary.overallChangePercent}%
   - Average Daily Change (Trend): $${summary.averageDailyTrend}
   - Volatility (Avg Deviation from Mean): $${summary.volatility}
   - 30-day MA : $${summary.shortTermMA}
   - 180-day MA : $${summary.longTermMA}
`;

  const prompt = `You are a financial analysis assistant. 
          
            Based on the following inputs, determine whether it is a good or bad time to Buy, Hold or Avoid this stock. Provide a clear recommendation and a brief explanation based on recent trends and the company's current tone.

            Inputs:
            - Ticker Symbol: ${ticker}
            - Company Tone: ${currentCompanyTone(sentimentScoreMean)}
            - Stock Price Data (Last 180 Days): ${stockSummaryText}

            Guidelines:
            - Analyze the trend in the stock price data (e.g., uptrend, downtrend, volatility), and factor in the company tone. Then provide a simple recommendation:
            - Respons with a clear recommendation: Buy, Hold, or Avoid.
            - Always have Buy, Hold or Avoid inside markdown for bold, for example **Buy**
            - If there's some info that's not provided like current price, never show that it's not provided
            - Explain your reasoning in 1-2 short sentances.
`;

  if (process.env.NODE_ENV !== "production") {
    console.log("Generated LLM prompt:\n", prompt);
  }

  /**
   * Stream Handler Setup
   * Configures streaming response for LLM output
   * - Creates text encoder for stream
   * - Establishes connection to local Ollama instance
   * - Handles chunked response streaming
   */
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
          model: "llama3.2:3b",
          prompt,
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
