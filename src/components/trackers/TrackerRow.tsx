import {ITracker, useTracker} from "@/providers/TrackerProvider";
import {TableHead, TableRow} from "../ui/table";
import {Button} from "../ui/button";
import {Trash} from "lucide-react";
import {QpopupLevel, QpopupType, usePopup} from "@/providers/PopupProvider";

function TrackerRow({tracker}: {tracker: ITracker}) {
	const {deleteTracker} = useTracker();
	const {openQpopup} = usePopup();

	function handleDelete(e: React.MouseEvent) {
		e.stopPropagation();
		openQpopup({
			title: "Confirm delete",
			message: "If you delete this item, it will be gone forever.",
			tp: QpopupType.CONFIRM,
			level: QpopupLevel.DANGER,
			actions: [
				{
					label: "Delete",
					action: () => {
						deleteTracker(tracker.id);
					},
					level: QpopupLevel.DANGER,
				},
			],
		});
	}

	return (
		<TableRow>
			{/* <TableHead>{tracker.id.slice(24)}</TableHead> */}
			<TableHead className="font-bold">{tracker.name}</TableHead>
			<TableHead>{tracker.redirect.url}</TableHead>
			<TableHead className="text-right">
				<Button className=" text-red-500 hover:text-red-300" variant="outline" onClick={handleDelete}>
					<Trash size={20} />
				</Button>
			</TableHead>
		</TableRow>
	);
}

export default TrackerRow;
