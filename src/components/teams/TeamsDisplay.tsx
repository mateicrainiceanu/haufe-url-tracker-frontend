import {useTeams} from "@/providers/TeamProvider";
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import TeamRow from "./TeamRow";
import {Card} from "../ui/card";

function TeamsDisplay() {
	const {teams} = useTeams();

	return (
		<Card className="p-4">
			<Table>
				<TableCaption>Your Teams</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Team id</TableHead>
						<TableHead>Team name</TableHead>
						<TableHead>Team owner</TableHead>
						<TableHead className="text-right">Options</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>{teams && teams.map((team) => <TeamRow key={team.id} team={team} />)}</TableBody>
			</Table>
		</Card>
	);
}

export default TeamsDisplay;
