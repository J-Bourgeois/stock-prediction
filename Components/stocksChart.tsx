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

  const filterChartDataByDays = ((preFilteredChartData: chartProps['chartData'], daysBack: number) => {

    const date = new Date(`${chartData.meta.date_to}T00:00:00.000Z`);
    
    const selectedTimeSpan = new Date(date);
    selectedTimeSpan.setUTCDate(date.getUTCDate() - daysBack);

    const filteredData = preFilteredChartData.data.filter((item) => {
      const itemDate = new Date(item.date);
      
      return itemDate >= selectedTimeSpan;
    });

    return filteredData;

  });

  const timeSpanNumber = Number(timeSpan.selectedTimeSpan.split(' ')[0]);

  const filteredChartData = filterChartDataByDays(chartData, timeSpanNumber);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={filteredChartData}>
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