import api from "@/lib/api";
import React, {createContext, useContext, useState} from "react";
import {useAlert} from "./AlertProvider";
import {ITracker} from "./TrackerProvider";

export interface IAccessLog {
	id: string;
	trackerId: string;
	ip: string;
	language: string;
	browser: string;
	deviceModel: string;
	deviceVendor: string;
	deviceOs: string;
	country: string;
	city: string;
	region: string;
	timezone: string;
	createdAt: Date;
}

export interface IAccessLogsContext {
	accessLogs: IAccessLog[];
	fetchAccessLogs: (trackerId: string) => void;
	accessTrackerData: ITracker | null;
}

const AccessLogsContext = createContext<IAccessLogsContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAccessLogs() {
	const context = useContext(AccessLogsContext);
	if (!context) {
		throw new Error("useAccessLogs must be used within an AccessLogsProvider");
	}
	return context;
}

function AccessLogsProvider({children}: {children: React.ReactNode}) {
	const {handleAxiosError} = useAlert();

	const [accessLogs, setAccessLogs] = useState<IAccessLog[]>([]);

	const [accessTrackerData, setAccessTrackerData] = useState<ITracker | null>(null);

	function fetchAccessLogs(trackerId: string) {
		api.get(`/tracker/${trackerId}/access-logs`)
			.then((res) => {
				setAccessTrackerData(res.data.tracker);
				setAccessLogs(res.data.accessLogs);
			})
			.catch(handleAxiosError);
	}

	return (
		<AccessLogsContext.Provider value={{accessLogs, accessTrackerData, fetchAccessLogs}}>
			{children}
		</AccessLogsContext.Provider>
	);
}

export default AccessLogsProvider;
