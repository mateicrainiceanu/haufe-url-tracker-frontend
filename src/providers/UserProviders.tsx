import React, {ReactNode, createContext, useContext, useState} from "react";
import { IUser } from "@/lib/types";

interface IUCtx {
	user: IUser;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserContext = createContext<IUCtx | null>(null);

export const useUser = () => {
	const ctx = useContext(UserContext);
	if (!ctx) throw new Error("useUser must be used within a UserProvider");
	return ctx;
};

function UserProvider({children}: {children: ReactNode}) {
	const [user, setUser] = useState<IUser | null>(null);

	return <UserContext.Provider value={{user, setUser} as IUCtx}>{children}</UserContext.Provider>;
}

export default UserProvider;
