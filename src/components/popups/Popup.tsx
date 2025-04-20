import CreateTeamPopup from "./CreateTeamPopup";
import {motion} from "framer-motion";
import {PopupType} from "@/providers/PopupProvider";

function Popup({type, close}: {type: PopupType | null; close: () => void}) {
	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{duration: 0.2}}
			className="fixed top-0 bottom-0 right-0 left-0 bg-muted/80 flex items-center justify-center">
			<motion.div
				initial={{opacity: 0, y: 50}}
				animate={{opacity: 1, y: 0}}
				exit={{opacity: 0, y: 50}}
				transition={{duration: 0.2}}
				className="w-full max-w-md">
				{type === PopupType.CREATE_TEAM && <CreateTeamPopup close={close} />}
			</motion.div>
		</motion.div>
	);
}

export default Popup;
