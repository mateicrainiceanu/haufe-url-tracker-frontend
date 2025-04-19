import {Alert, AlertTitle, AlertDescription} from "./ui/alert";
import {AlertCircle, CircleCheck, Info, TriangleAlert} from "lucide-react";
import {motion} from "framer-motion";

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
		<motion.div
			initial={{opacity: 0, y: 50}}
			animate={{opacity: 1, y: 0}}
			exit={{opacity: 0, y: 50}}
			transition={{duration: 0.2}}
			// className="absolute right-10 bottom-10 w-2/3 md:w-1/3"
		>
			<Alert variant={variant}>
				{variant === "error" && <AlertCircle />}
				{variant === "warning" && <TriangleAlert />}
				{variant === "info" && <Info />}
				{variant === "success" && <CircleCheck />}
				<AlertTitle>{title}</AlertTitle>
				<AlertDescription>{message}</AlertDescription>
			</Alert>
		</motion.div>
	);
}

export default AlertMsg;
