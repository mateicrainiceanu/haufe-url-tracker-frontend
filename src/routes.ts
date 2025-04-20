import { createBrowserRouter } from "react-router";
import Home from '@/pages/home/Home';
import Auth from "./pages/auth/Auth";
import Dash from "./pages/dash/Dash";
import Logout from "./pages/logout/Logout";
import Teams from "./pages/teams/Teams";

export default createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, Component: Home },
            {
                path: "auth", children:
                    [
                        { index: true, Component: Auth }
                    ]
            },
            {
                path: "logout",
                children: [
                    { index: true, Component: Logout }
                ]
            },
            {
                path: "dash",
                children: [
                    { index: true, Component: Dash },
                    {
                        path: "teams",
                        children: [
                            { index: true, Component: Teams },
                        ],
                    }
                ]
            }
        ],
    },
]);