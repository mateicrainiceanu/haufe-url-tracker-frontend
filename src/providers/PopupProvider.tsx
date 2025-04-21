/* eslint-disable react-refresh/only-export-components */
import Popup from "@/components/popups/Popup";
import QPopup from "@/components/popups/QPopup";
import {useContext, useState} from "react";
import {createContext} from "react";

interface IPopupCtx {
	popupType: PopupType | null;
	setPopupType: (type: PopupType | null) => void;
	closePopup: () => void;
	openPopup: (type: PopupType) => void;
	qpopup: IQpopup | null;
	closeQpopup: () => void;
	openQpopup: (popup: IQpopup) => void;
}

export enum QpopupType {
	CONFIRM, ERROR
}

export enum QpopupLevel {
	DANGER,
	WARN,
	INFO,
	SUCCESS,
	NORMAL,
}

export enum PopupType {
	INFO,
	CREATE_TEAM,
}

interface IQpopupAction {
	label: string;
	level: QpopupLevel;
	action: () => void;
}

export interface IQpopup {
	title: string;
	message: string;
	tp: QpopupType;
	level: QpopupLevel;
	actions: IQpopupAction[];
}

const PopupContext = createContext<IPopupCtx | null>(null);

export const usePopup = () => {
	const ctx = useContext(PopupContext);
	if (!ctx) throw new Error("usePopup must be used within a PopupProvider");
	return ctx;
};

function PopupProvider({children}: {children: React.ReactNode}) {
	const [popupType, setPopupType] = useState<PopupType | null>(null);
	const closePopup = () => setPopupType(null);
	const openPopup = (type: PopupType) => setPopupType(type);

	const [qpopup, setQpopup] = useState<IQpopup | null>(null);
	const closeQpopup = () => setQpopup(null);
	const openQpopup = (popup: IQpopup) => setQpopup(popup);

	return (
		<PopupContext.Provider
			value={{popupType, setPopupType, closePopup, openPopup, qpopup, closeQpopup, openQpopup} as IPopupCtx}>
			{children}
			{popupType !== null && <Popup type={popupType} close={closePopup} />}
			{qpopup !== null && <QPopup qpopup={qpopup}/>}
		</PopupContext.Provider>
	);
}

export default PopupProvider;
