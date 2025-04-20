import {createContext, useContext, useEffect} from "react";
import {useUser} from "./UserProviders";
import {useState} from "react";
import api from "@/lib/api";
import {useAlert} from "./AlertProvider";

interface ITeamUsr {
	id: string;
	email: string;
}

export interface ITeam {
	id: string;
	name: string;
	users: Array<ITeamUsr>;
	owner: ITeamUsr;
}

interface ITeamCtx {
	teams: Array<ITeam>;
	selectedTeam: ITeam | null;
	setSelectedTeam: (team: ITeam | null) => void;
	updateTeams: (teams: Array<ITeam>) => void;
	fetchTeams: () => void;
	deleteTeam: (teamId: string) => void;
	updateTeamName: (teamId: string, newName: string) => void;
}

const TeamsContext = createContext<ITeamCtx | null>(null);

//eslint-disable-next-line react-refresh/only-export-components
export function useTeams() {
	const ctx = useContext(TeamsContext);
	if (!ctx) throw new Error("useTeams must be used within a TeamProvider");
	return ctx;
}

function TeamProvider({children}: {children: React.ReactNode}) {
	const [teams, setTeams] = useState<Array<ITeam> | null>(null);
	const [selectedTeam, setSelectedTeamState] = useState<ITeam | null>(null);

	const {user} = useUser();
	const {handleAxiosError} = useAlert();

	useEffect(() => {
		if (user == null) {
			setTeams(null);
			setSelectedTeamState(null);
		} else {
			if (shouldUpdateTeams()) {
				fetchTeams();
			} else {
				getTeamsFromLocalStorage();
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(initSelectedTeam, [teams]);

	function fetchTeams() {
		api.get("/teams")
			.then((res) => {
				updateTeams(res.data.teams);
			})
			.catch(handleAxiosError);
	}

	function getTeamsFromLocalStorage() {
		const teams = localStorage.getItem("teams-data");
		if (teams) {
			const parsedTeams = JSON.parse(teams);
			if (parsedTeams) {
				setTeams(parsedTeams);
				return parsedTeams;
			}
		}
		fetchTeams();
	}

	function shouldUpdateTeams() {
		const lastUpdate = localStorage.getItem("last-teams-update");
		if (lastUpdate) {
			const lastUpdateTime = parseInt(lastUpdate);
			if (new Date(Date.now() - lastUpdateTime).getMinutes() < 5) {
				return false;
			}
		}
		return true;
	}

	function updateTeams(teams: Array<ITeam>) {
		setTeams(teams);
		localStorage.setItem("teams-data", JSON.stringify(teams));
		localStorage.setItem("last-teams-update", Date.now().toString());
	}

	function initSelectedTeam() {
		const teamId = localStorage.getItem("selected-team-id");
		if (teamId && teams) {
			const selectedTeam = teams.find((team) => team.id === teamId) || null;
			setSelectedTeamState(selectedTeam);
		}
	}

	function setSelectedTeam(team: ITeam | null) {
		if (team == null) {
			setSelectedTeamState(null);
			localStorage.removeItem("selected-team-id");
		} else {
			setSelectedTeamState(team);
			localStorage.setItem("selected-team-id", team.id);
		}
	}

	function updateTeamName(teamId: string, newName: string) {
		api.patch(`/team/${teamId}`, {name: newName})
			.then((res) => {
				if (res.status === 200) {
					const updatedTeams = res.data.teams;
					updateTeams(updatedTeams);
				}
			})
			.catch(handleAxiosError);
	}

	function deleteTeam(teamId: string) {
		api.delete(`/team/${teamId}`)
			.then((res) => {
				if (res.status === 204) {
					const updatedTeams = teams?.filter((team) => team.id !== teamId);
					updateTeams(updatedTeams || []);

					if (selectedTeam?.id === teamId) {
						setSelectedTeam(null);
						localStorage.removeItem("selected-team-id");
					}
				}
			})
			.catch(handleAxiosError);
	}

	return (
		<TeamsContext.Provider
			value={
				{teams, selectedTeam, setSelectedTeam, updateTeams, fetchTeams, deleteTeam, updateTeamName} as ITeamCtx
			}>
			{children}
		</TeamsContext.Provider>
	);
}

export default TeamProvider;
