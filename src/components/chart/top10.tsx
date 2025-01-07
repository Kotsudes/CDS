"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import * as QuartierService from "@/services/quartier";
import { useEffect, useState } from "react";
import { TDecla_Quartier } from "@/modules/declarartionQuartier/type";


const chartConfig = {
    declarations: {
        label: "Declarations",
        color: "hsl(var(--chart-1))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig


export default function MyTop10() {
    // Count the occurrences of each type
    
    // Convert the counts object into a format usable by the chart

    const [data, setData] = useState<TDecla_Quartier[]>();

    useEffect(() => {
        async function fetchData(){
            const tesQuartierQUIONTPRIS50000MILLEANSAFAIRE : TDecla_Quartier[] = await QuartierService.getTop10Quartier();
            const result = tesQuartierQUIONTPRIS50000MILLEANSAFAIRE.map((item) => {
                item.quartier = item.quartier + " - " + item.arrondissement+ "e"
                return item
            })
            setData(() => result)
        }
        fetchData()
    },[])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top 10 Most Problematic Neighbouroods</CardTitle>
                <CardDescription>July 2023 - July 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{
                            right: 26,
                            left: 42
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="quartier"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            //hide
                        />
                        <XAxis
                            dataKey="numberDeclarations"
                            type="number"
                            tickFormatter={(value) => value.toString()}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="numberDeclarations"
                            layout="vertical"
                            fill="var(--color-declarations)"
                            radius={4}
                        >
                            <LabelList
                                dataKey=""
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label]"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="numberDeclarations"
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