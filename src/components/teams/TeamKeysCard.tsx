import {ITeam, useTeams} from "@/providers/TeamProvider.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableHead, TableHeader, TableRow, TableBody} from "@/components/ui/table.tsx";
import TeamKeyRow from "@/components/teams/TeamKeyRow.tsx";
import {Button} from "@/components/ui/button.tsx";
import api from "@/lib/api.ts";
import {useAlert} from "@/providers/AlertProvider.tsx";

function TeamKeysCard({team}: { team: ITeam }) {

    const {handleAxiosError} = useAlert();
    const {updateOneLocalTeam} = useTeams();

    function generateNewKey() {
        api.post(`/dev/config/api-key`, {teamId: team.id})
            .then(res => {
                const newYey = res.data.key;
                updateOneLocalTeam({...team, devKeys: [...team.devKeys, newYey]});
                window.location.reload();
            }).catch(handleAxiosError)
    }

    return (
        <Card>
            <CardHeader className={"flex"}>
                <CardTitle>Team keys</CardTitle>
                <Button className={"ms-auto"} onClick={generateNewKey}>Generate new key</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead className={"text-right"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {team.devKeys.map(devKey =>
                            TeamKeyRow({devKey})
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default TeamKeysCard;