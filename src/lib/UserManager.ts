import { IUser } from "./types";

export default class UserManager {
    static setUserInStorage(user: IUser | null, token: string) {
        if (user !== null) {
            localStorage.setItem('user-email', user.email);
        } else {
            localStorage.removeItem("user-email");
        }
        
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }
}