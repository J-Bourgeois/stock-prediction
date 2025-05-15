"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";

type chartProps = {
  chartData: {
    meta: {
      date_from: string;
      date_to: string;
    };
    data: Array<{
      date: string;
      ticker: string;
      data: {
        close: number;
      };
    }>;
  };
  chartConfig: ChartConfig;
};

export function StocksChart({ chartData, chartConfig }: chartProps) {

  const timeSpan = useSelector((state: RootState) => state.timeSpan);

  const filterChartDataByDays = ((data: chartProps) => {

    const date = new Date();


  });

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData.data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          labelFormatter={(label) => {
            const date = new Date(label);

            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const year = date.getFullYear();

            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getHours()).padStart(2, "0");

            return `${month}-${day}, ${year} - ${hours}:${minutes}`;
          }}
          formatter={(value, name: string) => {
            const nameMap: { [key: string]: string } = {
              "data.close": " Close Price",
            };
            return [value, nameMap[name] || name];
          }}
        />
        <Bar dataKey="data.close" fill="var(--color-ticker)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}