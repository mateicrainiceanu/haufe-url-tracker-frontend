import { IUser } from "./types";

export default class UserManager {
    static setUserInStorage(user: IUser | null, token: string) {
        if (user !== null) {
            localStorage.setItem('user-email', user.email);
            localStorage.setItem('user-id', user.id);
        } else {
            localStorage.removeItem("user-email");
            localStorage.removeItem("user-id");
        }
        
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    static getUserFromMemory() {
        const lstoken = localStorage.getItem("token");
        const lsemail = localStorage.getItem("user-email");
        const lsid = localStorage.getItem("user-id");

        if (!lstoken) {
            //check that token is valid;
            return null;
        }

        if (!lsemail || !lsid) {
            return null;
        }

        const user: IUser = {
            id: lsid,
            email: lsemail,
        }

        return user;
    }
}
