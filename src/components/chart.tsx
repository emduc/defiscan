"use client";

import React, { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Fetch defi stats from defillama
const fetchDefiStats = async () => {
  const response = await fetch("https://api.llama.fi/v2/historicalChainTvl");
  const data = await response.json();
  console.log(data);
  return data.filter((x: { date: number; tvl: number }) => x.date > 1577833200);
};

const chartConfig = {
  tvl: {
    label: "TVL",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Chart() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDefiStats();
      setData(data);
    };
    fetchData();
  });

  return (
    <Card>
      <CardHeader>
        <div className="-mt-4 -mb-8">
          <CardDescription>Total Value Locked (TVL) in DeFi</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value * 1000);
                return date.toLocaleDateString("en-US");
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area dataKey="tvl" fill={`var(--color-tvl)`} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Chart;