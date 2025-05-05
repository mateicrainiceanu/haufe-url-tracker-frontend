import {DynamicPieChart} from "@/components/charts/DynamicPieChart";
import { ChartConfig } from "@/components/ui/chart";
import {generateDonoughtData} from "@/lib/generate-donought-data";
import {useAccessLogs} from "@/providers/AccessLogsProvider";
import { useEffect, useState } from "react";

function DonoughtLocationChart() {
	const {accessLogs} = useAccessLogs();

	const [data, setData] = useState<never[]>([]);
	const [config, setConfig] = useState<object>({});

	useEffect(()=> {
		const chartData = generateDonoughtData(accessLogs as never[], "country");
		setData(chartData.arr as never[]);
		setConfig(chartData.config);
	}, [accessLogs]);

    

	return (
		<DynamicPieChart
			data={data}
			dataKey="value"
			nameKey="name"
			config={config as ChartConfig}
			title={"Country visitors"}
			valueLabel="visitors"

		/>
	);
}

export default DonoughtLocationChart;
