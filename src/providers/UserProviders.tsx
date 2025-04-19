import {ReactNode, createContext, useContext, useEffect, useState} from "react";
import { IUser } from "@/lib/types";
import UserManager from "@/lib/UserManager";

interface IUCtx {
	user: IUser;
	setUser: (user: IUser, toke: string) => void;
}

const UserContext = createContext<IUCtx | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
	const ctx = useContext(UserContext);
	if (!ctx) throw new Error("useUser must be used within a UserProvider");
	return ctx;
};

function UserProvider({children}: {children: ReactNode}) {
	const [user, setUserState] = useState<IUser | null>(null);

	useEffect(() => {
		const user = UserManager.getUserFromMemory();
		setUserState(user);

		if (user === null && window.location.pathname.includes("/dash")) { 
			localStorage.setItem("lastPath", window.location.pathname);
			window.location.replace("/auth");
		}
	} ,[]);

	function setUser(userData: IUser | null, token: string) {
		UserManager.setUserInStorage(userData, token)
		setUserState(userData);
	}

	return <UserContext.Provider value={{user, setUser} as IUCtx}>{children}</UserContext.Provider>;
}

export default UserProvider;
