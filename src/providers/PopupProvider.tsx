import Popup from "@/components/popups/Popup";
import {useContext, useState} from "react";
import {createContext} from "react";

interface IPopupCtx {
	popupType: PopupType | null;
	setPopupType: (type: PopupType | null) => void;
	closePopup: () => void;
	openPopup: (type: PopupType) => void;
}

export enum PopupType {
	INFO,
	CREATE_TEAM,
}

const PopupContext = createContext<IPopupCtx | null>(null);

//eslint-disable-next-line react-refresh/only-export-components
export const usePopup = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within a PopupProvider");
  return ctx;
}

function PopupProvider({children}: {children: React.ReactNode}) {
	const [popupType, setPopupType] = useState<PopupType | null>(null);
	const closePopup = () => setPopupType(null);
	const openPopup = (type: PopupType) => setPopupType(type);

	return (
		<PopupContext.Provider value={{popupType, setPopupType, closePopup, openPopup} as IPopupCtx}>
			{children}
			{popupType !== null && <Popup type={popupType} close={closePopup} />}
		</PopupContext.Provider>
	);
}

export default PopupProvider;
