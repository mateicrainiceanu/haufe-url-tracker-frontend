import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ITeam} from "@/providers/TeamProvider";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../ui/card";
import TeamPermRow from "./TeamPermRow";
import {Button} from "../ui/button";
import {useState} from "react";
import AddUserToTeam from "../popups/AddUserToTeam";

function TeamPermissions({team}: {team: ITeam}) {
	const [addUser, setAddUser] = useState(false);

	return (
		<>
			{addUser && (
				<AddUserToTeam
					closePopup={() => {
						setAddUser(false);
					}}
					team={team}
				/>
			)}
			<Card className="p-4">
				<CardHeader>
					<CardTitle className="text-center">Team Members of team [{team.name}]</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="font-bold">
								<TableHead>Username</TableHead>
								<TableHead>Permission Type</TableHead>
								<TableHead className="text-right">Options</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{team.users.map((user) => (
								<TeamPermRow teamId={team.id} user={user} owner={team.owner} key={user.id} />
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button
						onClick={() => {
							setAddUser(true);
						}}>
						Add users
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}

export default TeamPermissions;
