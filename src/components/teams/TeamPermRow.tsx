import {ITeamUsr, useTeams} from "@/providers/TeamProvider";
import {TableCell, TableRow} from "../ui/table";
import {UserX} from "lucide-react";
import {useUser} from "@/providers/UserProviders";
import { QpopupLevel, QpopupType, usePopup } from "@/providers/PopupProvider";

function TeamPermRow({user, owner, teamId}: {user: ITeamUsr; owner: ITeamUsr, teamId: string}) {
	const isOwner = user.id === owner.id;
	const loggedUser = useUser().user;
	const {openQpopup} = usePopup();

	const {removeMemberFromTeam} = useTeams();

	function removeUser() {
		openQpopup({
			title: "Confirm remove",
			message: `Are you sure you want to remove ${user.email} from the team?`,
			level: QpopupLevel.DANGER,
			tp: QpopupType.CONFIRM,
			actions: [
				{
					label: "Remove",
					action: () => {
						removeMemberFromTeam(teamId, user.id);
					},
					level: QpopupLevel.DANGER,
				},
			],
		});
	}

	return (
		<TableRow className="min-h-24">
			<TableCell>{user.email}</TableCell>
			<TableCell>{isOwner ? "Owner" : "Team member"}</TableCell>
			<TableCell className="flex justify-end items-center">
				{loggedUser.id === owner.id && loggedUser.id !== user.id && (
					<button className="p-2 hover:bg-red-200 rounded-md" onClick={removeUser}>
						<UserX />
					</button>
				)}
				{isOwner && <div className="my-4"></div>}
			</TableCell>
		</TableRow>
	);
}

export default TeamPermRow;
