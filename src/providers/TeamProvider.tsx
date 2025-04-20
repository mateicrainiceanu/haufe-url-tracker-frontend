import {createContext, useContext, useEffect} from "react";
import {useUser} from "./UserProviders";
import {useState} from "react";
import api from "@/lib/api";
import { useAlert } from "./AlertProvider";

interface ITeamUsr {
	id: string;
	email: string;
}

interface ITeam {
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
}

const TeamsContext = createContext<ITeamCtx | null>(null);

//eslint-disable-next-line react-refresh/only-export-components
export function useTeams() {
	const ctx = useContext(TeamsContext);
	if (!ctx) throw new Error("useTeams must be used within a TeamProvider");
	return ctx;
}

function TeamProvider({children}: {children: React.ReactNode}) {
	const [teams, setTeams] = useState<Array<ITeam>>([]);
	const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);

	const {user} = useUser();
    const {handleAxiosError} = useAlert();

    useEffect(() => {
        if (user == null) {
            setTeams([]);
            setSelectedTeam(null);
        } else {

			//verify last fetch time
            api.get("/teams").then(res => {
                updateTeams(res.data.teams);
            }).catch(handleAxiosError);
        }
    }, [user]);

	function updateTeams(teams: Array<ITeam>) {
		setTeams(teams);
		localStorage.setItem("teams-data", JSON.stringify(teams));
		localStorage.setItem("last-teams-update", Date.now().toString());
	}

	return (
		<TeamsContext.Provider value={{teams, selectedTeam, setSelectedTeam, updateTeams} as ITeamCtx}>
			{children}
		</TeamsContext.Provider>
	);
}

export default TeamProvider;
