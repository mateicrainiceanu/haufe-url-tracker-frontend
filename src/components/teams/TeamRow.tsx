import {getUserNameFromEmail} from "@/lib/utils";
import {TableCell, TableRow} from "../ui/table";
import {ITeam, useTeams} from "@/providers/TeamProvider";
import {Trash} from "lucide-react";
import {QpopupLevel, QpopupType, usePopup} from "@/providers/PopupProvider";

function TeamRow({team}: {team: ITeam}) {
	const {deleteTeam} = useTeams();
	const {openQpopup} = usePopup();

	function handleDelete(e: React.MouseEvent) {
		e.stopPropagation();
		openQpopup({
			title: "Confirm delete",
			message: "If you delete this itemm, it will be gone forever.",
			tp: QpopupType.CONFIRM,
			level: QpopupLevel.DANGER,
			actions: [
				{
					label: "Delete",
					action: () => {
						deleteTeam(team.id);
					},
					level: QpopupLevel.DANGER,
				},
			],
		});
	}

	return (
		<TableRow
			onClick={() => {
				window.location.href = `/dash/teams/${team.id}`;
			}}>
			<TableCell className="font-light">{team.id.slice(24)}</TableCell>
			<TableCell className="font-bold">{team.name}</TableCell>
			<TableCell>{getUserNameFromEmail(team.owner.email)}</TableCell>
			<TableCell className="flex justify-end items-center h-full">
				<button
					className="text-red-500 hover:bg-red-100 transition-colors duration-200 p-2 rounded-md"
					onClick={handleDelete}>
					<Trash size={20} />
				</button>
			</TableCell>
		</TableRow>
	);
}

export default TeamRow;
