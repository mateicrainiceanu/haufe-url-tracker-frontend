import {Alert, AlertTitle, AlertDescription} from "./ui/alert";
import {AlertCircle, CircleCheck, Info, TriangleAlert} from "lucide-react";

function AlertMsg({
	title,
	message,
	variant,
}: {
	title: string;
	message: string;
	variant: null | "error" | "warning" | "info" | "success";
}) {
	return (
		<Alert className="absolute right-10 bottom-10 w-2/3 md:w-1/3" variant={variant}>
			{variant === "error" && <AlertCircle />}
			{variant === "warning" && <TriangleAlert />}
			{variant === "info" && <Info />}
			{variant === "success" && <CircleCheck />}
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
}

export default AlertMsg;
