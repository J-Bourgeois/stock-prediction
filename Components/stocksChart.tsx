"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const filterChartDataByDays = (
    preFilteredChartData: chartProps["chartData"],
    daysBack: number
  ) => {
    const date = new Date(`${preFilteredChartData.meta.date_to}T00:00:00.000Z`);

    const selectedTimeSpan = new Date(date);
    selectedTimeSpan.setUTCDate(date.getUTCDate() - daysBack);

    const filteredData = preFilteredChartData.data.filter((item) => {
      const itemDate = new Date(item.date);

      return itemDate >= selectedTimeSpan;
    });

    return filteredData;
  };

  const timeSpanNumber = Number(timeSpan.selectedTimeSpan.split(" ")[0]);

  const filteredChartData = filterChartDataByDays(chartData, timeSpanNumber);

  const getChartFooter = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {chartData.data[0].ticker === "NVDA"
            ? "Nvidia Corporation"
            : chartData.data[0].ticker === "AAPL"
            ? "Apple Inc."
            : chartData.data[0].ticker === "MSFT"
            ? "Microsoft"
            : "Ticker not found"}
        </CardTitle>
        <CardDescription>
          {`Showing hourly prices for the last ${timeSpanNumber} days`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] max-h-[200px] w-full"
        >
          <AreaChart accessibilityLayer data={filteredChartData}>
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
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
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
            <Area dataKey="data.close" fill="var(--color-ticker)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium">
              {`${getChartFooter(chartData.meta.date_from)} - ${getChartFooter(
                chartData.meta.date_to
              )}`}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// Code for Area Chart & Y-Axis numbers

/* "use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Axes</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} */
