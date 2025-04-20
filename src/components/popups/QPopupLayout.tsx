import {motion} from "framer-motion";

function QPopupLayout({children}: {children: React.ReactNode}) {
	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{duration: 0.2}}
			className="fixed z-50 top-0 bottom-0 right-0 left-0 bg-muted/80 flex items-center justify-center">
			<motion.div
				initial={{opacity: 0, y: 50}}
				animate={{opacity: 1, y: 0}}
				exit={{opacity: 0, y: 50}}
				transition={{duration: 0.2}}
				className="w-full max-w-md">
				{children}
			</motion.div>
		</motion.div>
	);
}

export default QPopupLayout;
