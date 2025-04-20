import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {usePopup, PopupType} from "@/providers/PopupProvider";
import {useTeams} from "@/providers/TeamProvider";
import {Ellipsis, PanelBottomClose, Plus} from "lucide-react";

function NavTeamSelector() {
	const {teams, selectedTeam, setSelectedTeam} = useTeams();

	const {openPopup} = usePopup();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="p-2 border-2 rounded-md border-gray-200 hover:border-gray-300 transition-colors focus:outline-none flex gap-4">
				{selectedTeam ? selectedTeam.name : "Select Team"} <PanelBottomClose color="lightgray" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="font-bold">Teams</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{teams.map((team) => (
					<DropdownMenuItem key={team.id} onClick={() => setSelectedTeam(team)}>
						{team.name}
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						openPopup(PopupType.CREATE_TEAM);
					}}>
					<Plus /> Create team
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						window.location.href = "/dash/teams";
					}}>
					<Ellipsis /> Teams options
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default NavTeamSelector;
