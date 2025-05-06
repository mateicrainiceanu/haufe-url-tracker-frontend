import {ITracker, useTracker} from "@/providers/TrackerProvider";
import {TableHead, TableRow} from "../ui/table";
import {Button} from "../ui/button";
import {Link, Pencil, Trash} from "lucide-react";
import {QpopupLevel, QpopupType, usePopup} from "@/providers/PopupProvider";
import {useAlert} from "@/providers/AlertProvider";
import {apiBase} from "@/lib/utils";
import React, {useState} from "react";
import TrackerEdit from "@/components/popups/TrackerEdit.tsx";

function TrackerRow({tracker}: {tracker: ITracker}) {
	const {deleteTracker} = useTracker();
	const {openQpopup} = usePopup();
	const {addAlert} = useAlert();

	const [edit, setEdit] = useState(false);

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

	function handleCopyLink(e: React.MouseEvent) {
		e.stopPropagation();
		window.navigator.clipboard.writeText(apiBase + "/" + tracker.redirect.keyword).then(() => {
			addAlert({
				title: "Copied to clipboard",
				message: "The link has been copied to your clipboard.",
				variant: "success",
			});
		});
	}

	return (<>
			{edit && <TrackerEdit trackerData={tracker} close={()=>{setEdit(false)}}/> }
		<TableRow
			onClick={() => {
				window.open("/dash/trackers/" + tracker.id, "_blank");
			}}>
			{/* <TableHead>{tracker.id.slice(24)}</TableHead> */}
			<TableHead className="font-bold">{tracker.name}</TableHead>
			<TableHead>{tracker.redirect.url}</TableHead>
			<TableHead className="text-right">
				<Button onClick={e => {
					e.stopPropagation();
					setEdit(true);
				}} variant="outline">
					<Pencil size={20} />
				</Button>
				<Button variant="outline" onClick={handleCopyLink}>
					<Link size={20} />
				</Button>
				<Button className=" text-red-500 hover:text-red-300" variant="outline" onClick={handleDelete}>
					<Trash size={20} />
				</Button>
			</TableHead>
		</TableRow>
	</>
	);
}

export default TrackerRow;
