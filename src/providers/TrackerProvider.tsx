import React, {createContext, useContext, useEffect} from "react";
import {ITeam, useTeams} from "./TeamProvider";
import api from "@/lib/api";
import {useAlert} from "./AlertProvider";

export interface IRedirect {
	id: string;
	keyword: string;
	url: string;
}

export interface ITracker {
	id: string;
	name: string;
	description: string;
	teamId: string;
	team: ITeam;
	redirect: IRedirect;
}

export interface ITrackerCtx {
	trackers: ITracker[] | null;
	setTrackers: (trackers: ITracker[] | null) => void;
	forceRefreshTrackers: () => void;
	deleteTracker: (trackerId: string) => void;
	createTracker: (
		data: {url: string; keyword?: string; name?: string; description?: string},
		onComplete?: () => void
	) => void;
}

const TrackerContext = createContext<ITrackerCtx | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useTracker() {
	const ctx = useContext(TrackerContext);
	if (!ctx) throw new Error("useTracker must be used within a TrackerProvider");
	return ctx;
}

function TrackerProvider({children}: {children: React.ReactNode}) {
	const {selectedTeam} = useTeams();
	const {handleAxiosError, addAlert} = useAlert();

	const [trackers, setTrackersState] = React.useState<ITracker[] | null>(null);

	useEffect(() => {
		initTrackers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTeam]);

	async function fetchTrackers(onComplete?: () => void) {
		if (!selectedTeam) return;
		await api.get("/tracker", {params: {teamId: selectedTeam?.id}})
			.then((res) => {
				setTrackers(res.data.trackers.reverse());
			})
			.catch(handleAxiosError);
		onComplete?.();
	}

	function initTrackers() {
		if (!selectedTeam) {
			setTrackersState(null);
			return;
		}
		const trackers = getLocalTrackers();
		if (shouldUpdateTrackers() && !isLocalTrackerTeamIdValid()) {
			fetchTrackers();
		} else {
			setTrackersState(trackers);
		}
	}

	function forceRefreshTrackers() {
		fetchTrackers(() => {
			addAlert({
				variant: "success",
				title: "Refreshed successfully",
				message: "Trackers refreshed successfully",
			});
		});
	}

	function createTracker(
		data: {url: string; keyword?: string; name?: string; description?: string},
		onComplete?: () => void
	) {
		if (!selectedTeam) return;

		api.post("/tracker", {...data, teamId: selectedTeam.id})
			.then((res) => {
				const {tracker} = res.data;
				setTrackers([tracker, ...(trackers || [])]);
				addAlert({
					variant: "success",
					title: "Created successfully",
					message: "Tracker created successfully",
				});
				onComplete?.();
			})
			.catch(handleAxiosError);
	}

	function shouldUpdateTrackers() {
		const lastUpdate = localStorage.getItem("trackers-update");
		if (new Date(Date.now() - new Date(lastUpdate || 0).getTime()).getMinutes() > 5) {
			return true;
		}

		const trackers = getLocalTrackers();
		if (trackers !== null) {
			return true;
		}

		return false;
	}

	function getLocalTrackers() {
		return JSON.parse(localStorage.getItem("trackers") || "null");
	}

	function isLocalTrackerTeamIdValid() {
		const locatTrackerTeamId = localStorage.getItem("trackers-team-id");
		if (!locatTrackerTeamId) {
			return false;
		}

		if (locatTrackerTeamId !== selectedTeam?.id) {
			return false;
		}

		return true;
	}

	function deleteTracker(trackerId: string) {
		api.delete(`/tracker/${trackerId}`)
			.then(() => {
				addAlert({
					variant: "success",
					title: "Deleted successfully",
					message: "Tracker deleted successfully",
				});
				fetchTrackers();
			})
			.catch(handleAxiosError);
	}

	function setTrackers(trackers: ITracker[] | null) {
		setTrackersState(trackers);
		localStorage.setItem("trackers-team-id", selectedTeam?.id || "");
		localStorage.setItem("trackers-update", Date.now().toString());
		localStorage.setItem("trackers", JSON.stringify(trackers));
	}

	return (
		<TrackerContext.Provider
			value={{trackers, setTrackers, forceRefreshTrackers, deleteTracker, createTracker} as ITrackerCtx}>
			{children}
		</TrackerContext.Provider>
	);
}

export default TrackerProvider;
