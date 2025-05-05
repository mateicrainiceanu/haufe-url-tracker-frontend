import { TimelineChart } from "@/components/charts/TimelineChart";
import {generateTimeData} from "@/lib/generate-time-data";
import {useAccessLogs} from "@/providers/AccessLogsProvider";

function TimeRqChart() {
	const {accessLogs} = useAccessLogs();

	const formattedData = generateTimeData(accessLogs);

	return <TimelineChart chartData={formattedData}/>;
}

export default TimeRqChart;
