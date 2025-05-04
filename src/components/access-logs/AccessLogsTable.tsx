import {useAccessLogs} from "@/providers/AccessLogsProvider";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "../ui/table";
import { useState} from "react";
import AccessLogRow from "./AccessLogRow";
import {Pagination} from "@mui/material";

const dataPerPage = 10;

function AccessLogsTable({id}: {id: string}) {
	const trackerId = id;

	const {accessLogs, accessTrackerData} = useAccessLogs();

    const [page, setPage] = useState(1);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Tracker - {accessTrackerData?.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>log id</TableHead>
							<TableHead>time</TableHead>
							<TableHead>ip</TableHead>
							<TableHead>browser</TableHead>
							<TableHead>country</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{accessLogs.slice((page-1) * dataPerPage, dataPerPage * page).map((log) => (
							<AccessLogRow key={log.id} log={log} />
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter className="flex flex-col items-center">
				<Pagination
					className="m-5"
                    page={page}
                    onChange={(_, page) => {
                        setPage(page);
                    }}
					count={Math.ceil(accessLogs.length / dataPerPage)}
					showFirstButton
					showLastButton
				/>
				<span className="font-light">id: {trackerId}</span>
			</CardFooter>
		</Card>
	);
}

export default AccessLogsTable;
