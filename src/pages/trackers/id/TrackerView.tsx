import AccessLogsTable from "@/components/access-logs/AccessLogsTable";
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
	}, [trackerId]);

	return (
		<>
			<AccessLogsTable id={trackerId!} />
		</>
	);
}

export default TrackerView;
