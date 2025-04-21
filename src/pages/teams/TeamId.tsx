import TeamPermissions from "@/components/teams/TeamPermissions";
import {Input} from "@/components/ui/input";
import {QpopupLevel, QpopupType, usePopup} from "@/providers/PopupProvider";
import {ITeam, useTeams} from "@/providers/TeamProvider";
import {AxiosError} from "axios";
import {Pencil, Save} from "lucide-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

const qpopupActions = [
	{
		label: "Go to teams",
		action: () => {
			window.location.href = "/dash/teams";
		},
		level: QpopupLevel.NORMAL,
	},
];

function TeamId() {
	const {teamId} = useParams<{teamId: string}>();

	const {teams, getTeamById, fetchTeamById, updateTeamName} = useTeams();
	const {openQpopup} = usePopup();

	const [team, setTeam] = useState<ITeam | null>(null);

	const [edit, setEdit] = useState(false);

	let fetched = false;

	async function initTeam(teamId: string) {
		const res = getTeamById(teamId);
		if (res) {
			setTeam(res);
		}

		if (!fetched) {
			const team = await fetchTeamById(teamId, (error: AxiosError) => {
				openQpopup({
					title: `Error [${error.response?.status}]`,
					message: (error.response?.data as string) || "An error occurred while updating team data.",
					tp: QpopupType.ERROR,
					level: QpopupLevel.INFO,
					actions: qpopupActions,
				});
			});

			setTeam(team);
			fetched = true;
		}
	}

	useEffect(() => {
		if (!teamId) {
			openQpopup({
				title: "Error",
				message: "No team ID provided.",
				tp: QpopupType.ERROR,
				level: QpopupLevel.INFO,
				actions: qpopupActions,
			});
			return;
		}

		initTeam(teamId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [teamId, teams]);

	function toggleEdit() {
		setEdit((prev) => !prev);
	}

	function handleSave() {
        updateTeamName(teamId!, team!.name);
        initTeam(teamId!);
		toggleEdit();
	}

	if (!team) {
		return (
			<div className="flex flex-col gap-4">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				{edit ? (
					<Input
						className="max-w-lg"
						value={team.name}
						onChange={(e) => {
							setTeam((prev) => ({...prev, name: e.target.value} as ITeam));
						}}
					/>
				) : (
					<h1>{team?.name}</h1>
				)}
				<button className="p-2 hover:bg-muted rounded-md" onClick={edit ? handleSave : toggleEdit}>
					{edit ? <Save /> : <Pencil />}
				</button>
			</div>
			<p>Team ID: {team?.id}</p>
			<p>Team owner: {team.owner.email}</p>
			<TeamPermissions team={team} />
		</div>
	);
}

export default TeamId;
