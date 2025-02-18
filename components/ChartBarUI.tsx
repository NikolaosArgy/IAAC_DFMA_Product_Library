"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

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

export function ChartBarComponent({ data }: any) {

    // Ensure data is an array and extract the first object (assuming only one object in the array)
    const firstItem = Array.isArray(data) && data.length > 0 ? data[0] : null;

    // Ensure firstItem has valid material names and areas before mapping
    const materialNames = firstItem?.["properties.Material Quantities.*.materialName"] ?? [];
    const areas = firstItem?.["properties.Material Quantities.*.area"] ?? [];

    // Create chart data by mapping material names to their corresponding areas
    const chartData = materialNames.map((name: string, index: number) => ({
        materialName: name,
        Area: (areas[index] ?? 0) / 1_000_000,
    }));

    const totalArea = chartData.reduce((sum: any, material: any) => sum + material?.Area, 0);

    console.log("ChartData:", chartData);

    return (
        <Card className="flex flex-col h-[342px] mb-4">
            <CardHeader>
                <CardTitle>Area</CardTitle>
                <CardDescription>Showing the area in square meters for each material</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex justify-center items-center overflow-hidden p-0">
                <ChartContainer className="w-full h-full max-h-[250px] px-4" config={chartConfig}>
                    <BarChart width={500} height={250} data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="materialName" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis dataKey="Area" tickLine={false} tickMargin={10} axisLine={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="Area" radius={8}>
                            {chartData.map((entry: any, index: any) => (
                                <Cell key={`cell-${index}`} fill={colorConfig.colors[index % colorConfig.colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm pt-2">
                <div className="leading-none text-muted-foreground">
                    Total Area is {totalArea.toFixed(3)} m²
                </div>
            </CardFooter>
        </Card>
    );
}
