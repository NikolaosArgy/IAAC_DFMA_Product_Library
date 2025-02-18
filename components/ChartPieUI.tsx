"use client"

import { Pie, PieChart, Cell, ZAxis } from "recharts"

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

const colorConfig = {
  colors: [
    "#20897D", // Teal (Chrome)
    "#E76F51", // Warm Red (Safari)
    "#264653", // Deep Blue (Firefox)
    "#E9C46A", // Muted Yellow (Edge)
    "#F4A261"  // Soft Orange (Other)
  ]
};

const chartConfig = {
  materialName: {
    label: "Material",
  }
} satisfies ChartConfig

export function ChartPieComponent({ data }: any) {

  // Ensure data is an array and extract the first object (assuming only one object in the array)
  const firstItem = Array.isArray(data) && data.length > 0 ? data[0] : null;

  // Ensure firstItem has valid material names and areas before mapping
  const materialNames = firstItem?.["properties.Material Quantities.*.materialName"] ?? [];
  const volumes = firstItem?.["properties.Material Quantities.*.volume"] ?? [];

  // Create chart data by mapping material names to their corresponding areas
  const chartData = materialNames.map((name: string, index: number) => ({
    materialName: name,
    Volume: (volumes[index] ?? 0) * 1e-9,
  }));

  const totalVolume = chartData.reduce((sum: any, material: any) => sum + material?.Volume, 0);

  //console.log(chartData)

  return (
    <Card className="flex flex-col h-[342px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Volume</CardTitle>
        <CardDescription>Showing the volume in cubic meters for each material</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="Volume"
              nameKey="materialName"
              innerRadius={60}
            > {chartData.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={colorConfig.colors[index % colorConfig.colors.length]} />
            ))}</Pie>

          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total Volume is {totalVolume.toFixed(3)} m³
        </div>
      </CardFooter>
    </Card>
  )
}
