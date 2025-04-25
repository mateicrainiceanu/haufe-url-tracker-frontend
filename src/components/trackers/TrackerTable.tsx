import {useTracker} from "@/providers/TrackerProvider";
import {Card, CardHeader, CardTitle} from "../ui/card";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "../ui/table";
import TrackerRow from "./TrackerRow";
import {Button} from "../ui/button";
import {RefreshCcw} from "lucide-react";

function TrackerTable() {
	const {trackers, forceRefreshTrackers} = useTracker();
	console.log("trackers", trackers);

	if (!trackers) {
		return <>Loading... Please make sure a team is selected.</>;
	}

	return (
		<Card className="p-5 my-5">
			<CardHeader className="flex items-center">
				<CardTitle>Trackers</CardTitle>
				<Button className="ms-auto" variant="outline" onClick={forceRefreshTrackers}>
					<RefreshCcw />
				</Button>
			</CardHeader>
			<Table>
				<TableHeader>
					<TableRow>
						{/* <TableHead>Id</TableHead> */}
						<TableHead>Name</TableHead>
						<TableHead>Link</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{trackers?.map((tracker) => (
						<TrackerRow key={tracker.id} tracker={tracker} />
					))}
				</TableBody>
			</Table>
		</Card>
	);
}

export default TrackerTable;
