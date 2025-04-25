import {X} from "lucide-react";
import {Input} from "../ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useAlert } from "@/providers/AlertProvider";
import { useTeams } from "@/providers/TeamProvider";
import { useState } from "react";
import BeatLdr from "../spinners/BeatLdr";


const teamSchema = z.object({
	name: z.string().min(1, "Team name is required"),
});

type FormData = z.infer<typeof teamSchema>;

function CreateTeamPopup({close}: {close: () => void}) {
    const {handleAxiosError} = useAlert();
    const {updateTeams, setSelectedTeam} = useTeams();
    const {addAlert} = useAlert();
    const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<FormData>({resolver: zodResolver(teamSchema)});

	function onSubmit(data: FormData) {
        setLoading(true);
		api.post("/team", {name: data.name}).then((res) => {
			updateTeams(res.data.teams);
            const nteam = res.data.teams[res.data.teams.length - 1];
            setSelectedTeam(nteam);
            addAlert({variant: "success", title: "Team Created", message: `Team "${nteam.name}" created and is now selected`});
            close();
		}).catch(handleAxiosError).finally(() => {
            setLoading(false);
        });
	}

	return (
		<Card className="w-full max-w-md relative">
			<CardHeader>
				<CardTitle>
					<button
						className="absolute top-2 right-2 hover:bg-muted hover:rounded-md p-2 duration-200"
						onClick={close}>
						<X />
					</button>
					Create a New Team
				</CardTitle>
				<CardDescription>Create a new team to start and manage clicks efficiently.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-3">
							{/* <Label htmlFor="teamName">Team Name</Label> */}
							<Input {...register("name")} type="text" placeholder="Enter team name" required />
							{errors.name && <span>{errors.name.message}</span>}
						</div>
						<div className="flex flex-col gap-3">
							<Button type="submit" className="w-full" disabled={loading}>
								{!loading ? "Create Team" : <BeatLdr  />}
							</Button>
							<Button variant="outline" onClick={close}>
								Cancel
							</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

export default CreateTeamPopup;
