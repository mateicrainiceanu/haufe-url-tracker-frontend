import {useTeams} from "@/providers/TeamProvider";
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import TeamRow from "./TeamRow";
import {Card, CardContent} from "../ui/card";

function TeamsDisplay() {
    const {teams} = useTeams();

    return (
        <Card className="">
            <CardContent>
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
                    <TableBody>{teams && teams.map((team) => <TeamRow key={team.id} team={team}/>)}</TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default TeamsDisplay;
