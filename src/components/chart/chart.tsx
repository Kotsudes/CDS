"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TCategory } from "@/modules/category/type";
import * as CategoryService from "@/services/category";
import { useEffect, useState } from "react";

const chartConfig = {
    declarations: {
        label: "Declarations",
        color: "hsl(var(--chart-1))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig


export default function MyBarChart() {
    // Count the occurrences of each type
    
    // Convert the counts object into a format usable by the chart
    const [categories, setCategories] = useState<TCategory[]>([]);

    useEffect(() => {
        async function fetchData(){
            const result = await CategoryService.get()
            setCategories(() => result)
        }

        fetchData()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Declarations by Type</CardTitle>
                <CardDescription>July 2023 - July 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={categories}
                        layout="vertical"
                        margin={{
                            right: 26,
                            left: 42
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="_id"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            //hide
                        />
                        <XAxis
                            dataKey="count"
                            type="number"
                            tickFormatter={(value) => value.toString()}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="count"
                            layout="vertical"
                            fill="var(--color-declarations)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="type"
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label]"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="count"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}