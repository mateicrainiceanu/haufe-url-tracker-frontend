import { IAccessLog } from "@/providers/AccessLogsProvider";
import { TableCell, TableRow } from "../ui/table"
import moment from "moment";

function AccessLogRow({log}: {log: IAccessLog}) {
  return (
		<TableRow>
			<TableCell>{log.id.slice(24)}</TableCell>
			<TableCell>{moment(log.createdAt).format("hh:mm:ss YY-MM-DD")}</TableCell>
			<TableCell>{log.ip}</TableCell>
			<TableCell>{log.browser}</TableCell>
			<TableCell>{log.country}</TableCell>
		</TableRow>
  );
}

export default AccessLogRow;