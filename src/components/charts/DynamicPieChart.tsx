import * as React from "react";
import {PieChart, Pie, Label} from "recharts";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig} from "@/components/ui/chart";

type ChartItem = {
	[key: string]: string | number | undefined;
	fill?: string;
};

type DynamicPieChartProps = {
	data: ChartItem[];
	dataKey: string;
	nameKey: string;
	config: ChartConfig;
	title?: string;
	valueLabel?: string;
};

export function DynamicPieChart({
	data,
	dataKey,
	nameKey,
	config,
	title = "Pie Chart",
	valueLabel = "Total",
}: DynamicPieChartProps) {
	const total = React.useMemo(() => {
		return data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);
	}, [data, dataKey]);

	const enhancedData = data.map((item) => ({
		...item,
		fill:
			item[nameKey] !== undefined
				? config[item[nameKey] as string]?.color || "hsl(var(--muted))"
				: "hsl(var(--muted))",
	}));

	return (
		<Card className="flex flex-col w-full">
			<CardHeader className="items-center pb-0">
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			{enhancedData.length > 0 ? (
				<CardContent className="flex-1 pb-0">
					<ChartContainer
						config={config}
						className="mx-auto aspect-square min-w-2xs min-h-2xs max-h-[250px]">
						<PieChart>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<Pie
								data={enhancedData}
								dataKey={dataKey}
								nameKey={nameKey}
								innerRadius={60}
								strokeWidth={5}>
								<Label
									content={({viewBox}) => {
										if (viewBox && "cx" in viewBox && "cy" in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor="middle"
													dominantBaseline="middle">
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className="fill-foreground text-3xl font-bold">
														{total.toLocaleString()}
													</tspan>
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy || 0) + 24}
														className="fill-muted-foreground">
														{valueLabel}
													</tspan>
												</text>
											);
										}
										return null;
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				</CardContent>
			): <span className="text-center font-light">No data yet</span>}
			{/* <CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing {valueLabel.toLowerCase()} for the last 6 months
				</div>
			</CardFooter> */}
		</Card>
	);
}
