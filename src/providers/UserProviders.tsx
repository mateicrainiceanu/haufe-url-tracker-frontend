import React, {ReactNode, createContext, useContext, useEffect, useState} from "react";
import { IUser } from "@/lib/types";
import UserManager from "@/lib/UserManager";

interface IUCtx {
	user: IUser;
	setUser: (user: IUser, toke: string) => void;
}

const UserContext = createContext<IUCtx | null>(null);

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
	} ,[]);

	function setUser(userData: IUser | null, token: string) {
		UserManager.setUserInStorage(userData, token)
		setUserState(userData);
	}

	return <UserContext.Provider value={{user, setUser} as IUCtx}>{children}</UserContext.Provider>;
}

export default UserProvider;
