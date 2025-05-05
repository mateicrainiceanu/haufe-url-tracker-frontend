import AccessLogsTable from "@/components/access-logs/AccessLogsTable";
import DonoughtLocationChart from "@/components/access-logs/charts/DonoughtLocationChart";
import TimeRqChart from "@/components/access-logs/charts/TimeRqChart";
import {useAccessLogs} from "@/providers/AccessLogsProvider";
import {useEffect} from "react";
import {useParams} from "react-router";

function TrackerView() {
	const {fetchAccessLogs} = useAccessLogs();

	const {trackerId} = useParams<{trackerId: string}>();

	useEffect(() => {
		if (trackerId) {
			fetchAccessLogs(trackerId!);
		} else {
			alert("Tracker ID is not provided");
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trackerId]);

	return (
		<>
			<div className="flex flex-col items-center gap-4 my-4">
				<DonoughtLocationChart />
				<TimeRqChart />
			</div>
			<AccessLogsTable id={trackerId!} />
		</>
	);
}

export default TrackerView;
