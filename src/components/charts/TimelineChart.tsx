
import * as React from "react";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
const chartConfig = {
	visitors: {
		label: "Visitors",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function TimelineChart({chartData}: {chartData: {date: string; visitors: number}[]}) {
	const [timeRange, setTimeRange] = React.useState("90d");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date(Date.now());
		let daysToSubtract = 90;
		if (timeRange === "30d") daysToSubtract = 30;
		else if (timeRange === "7d") daysToSubtract = 7;

		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card className="w-full">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Visitors</CardTitle>
					<CardDescription>Showing total visitors for the last 3 months</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>

			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 w-full">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) =>
								new Date(value).toLocaleDateString("en-US", {month: "short", day: "numeric"})
							}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) =>
										new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										})
									}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="visitors"
							type="natural"
							fill="url(#fillVisitors)"
							stroke="var(--color-visitors)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
