import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useTeams} from "@/providers/TeamProvider";
import {Ellipsis, PanelBottomClose, Plus} from "lucide-react";

function NavTeamSelector() {
	const {teams, selectedTeam, setSelectedTeam} = useTeams();

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
				<DropdownMenuItem><Plus /> Create team</DropdownMenuItem>
				<DropdownMenuItem><Ellipsis /> Teams options</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default NavTeamSelector;
