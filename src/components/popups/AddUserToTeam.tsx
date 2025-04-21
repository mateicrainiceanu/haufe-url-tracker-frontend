import {ITeam, ITeamUsr, useTeams} from "@/providers/TeamProvider";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import QPopupLayout from "./QPopupLayout";
import {Button} from "../ui/button";
import Autocomplete from "../Autocomplete";
import {useState} from "react";
import {User} from "lucide-react";
import api from "@/lib/api";
import {useAlert} from "@/providers/AlertProvider";

function AddUserToTeam({closePopup, team}: {closePopup: () => void; team: ITeam}) {
	const {handleAxiosError, addAlert} = useAlert();
    const {updateOneLocalTeam} = useTeams();

	const [options, setOptions] = useState<{text: string; id: string}[]>([]);
	const [selectedUser, setSelectedUser] = useState<ITeamUsr | null>(null);
	const [loading, setLoading] = useState(false);

	function fetchOptions(query: string) {
		setLoading(true);
		api.get("/user", {params: {email: query}})
			.then((res) => {
				const {users} = res.data as {users: ITeamUsr[]};
				setOptions(users.map((user) => ({text: user.email, id: user.id})));
			})
			.catch(handleAxiosError)
			.finally(() => {
				setLoading(false);
			});
		return [];
	}

	function onSelectUser(id: string) {
		const user = options.find((user) => user.id === id);
		if (!user) {
			setTimeout(() => {
				const user = options.find((user) => user.id === id);
				setSelectedUser({email: user?.text || "", id: id});
			}, 500);
		}
		setSelectedUser({email: user?.text || "", id: id});
	}

	function updateOptions(query: string) {
		if (query.length < 3) {
			return [];
		}
		fetchOptions(query);
	}

    function onSave() {
        if (selectedUser) {
            api.post(`/team/${team.id}/user`, {teamId: team.id, userId: selectedUser.id}).then((res) => {
                updateOneLocalTeam(res.data.team);
                addAlert({variant: "success", title: "User added", message: `User ${selectedUser.email} added to team ${team.name}`});
                closePopup();
            }).catch(handleAxiosError);
        } else {
            addAlert({variant: "error", title: "No user selected", message: "Please select a user to add to the team"});
        }
    }

	return (
		<QPopupLayout>
			<Card>
				<CardHeader>
					<CardTitle>Add user to team [{team.name}]</CardTitle>
					<CardDescription>Add a user that will have access to the resources of this team.</CardDescription>
				</CardHeader>
				<CardContent>
					{selectedUser !== null ? (
						<Button className="flex flex-row gap-2 w-full justify-start" variant="outline" onClick={() => setSelectedUser(null)}>
                            <User/>
                            <span className="text-sm">{selectedUser.email}</span> 
                        </Button>
					) : (
						<Autocomplete
							options={options}
							onSelect={onSelectUser}
							updateOptions={updateOptions}
							symbol={<User />}
							loading={loading}
						/>
					)}
				</CardContent>
				<CardFooter className="flex flex-col gap-2">
					<Button className="w-full" onClick={onSave}>Save</Button>
					<Button variant="outline" className="w-full" onClick={closePopup}>
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</QPopupLayout>
	);
}

export default AddUserToTeam;
