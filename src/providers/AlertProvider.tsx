import AlertMsg from "@/components/AlertMsg";
import { AxiosError } from "axios";
import {useContext, useState} from "react";
import {createContext} from "react";

interface IAlert {
	variant: "success" | "error" | "info" | "warning";
	title: string;
	message: string;
}

interface IAlertCtx {
	addAlert: (alert: IAlert) => void;
	handleAxiosError: (error: AxiosError) => void;
}

//eslint-disable-next-line react-refresh/only-export-components
export function useAlert() {
	const ctx = useContext(AlertContext);
	if (!ctx) throw new Error("useAlert must be used within an AlertProvider");
	return ctx;
}

const AlertContext = createContext<IAlertCtx | null>(null);

function AlertProvider({children}: {children: React.ReactNode}) {
	const [alerts, setAlerts] = useState<Array<IAlert>>([]);

	function addAlert(alert: IAlert) {
		setAlerts((prev) => [...prev, alert]);
		setTimeout(() => {
			setAlerts((prev) => {
				prev.shift();
				return [...prev];
			});
		}, 5000);
	}

	function handleAxiosError(error: AxiosError) {
		const {response} = error;
		if (response) {
			addAlert({
				variant: "error",
				title: `${response.status} Error`,
				message:
					response.data as string
			});
		} else {
			addAlert({
				variant: "error",
				title: "Network Error",
				message: "Please check your internet connection",
			});
		}
	}

	return (
		<AlertContext.Provider value={{addAlert, handleAxiosError} as IAlertCtx}>
			{children}
			<div className="fixed right-10 bottom-10 w-2/3 md:w-1/3 z-50">
				{alerts.map((alert: IAlert, index) => (
					<div key={index} className="mb-2">
						<AlertMsg title={alert.title} message={alert.message} variant={alert.variant} />
					</div>
				))}
			</div>
		</AlertContext.Provider>
	);
}

export default AlertProvider;
