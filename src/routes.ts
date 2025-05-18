import {createBrowserRouter} from "react-router";
import Home from '@/pages/home/Home';
import Auth from "./pages/auth/Auth";
import Dash from "./pages/dash/Dash";
import Logout from "./pages/logout/Logout";
import Teams from "./pages/teams/Teams";
import TeamId from "./pages/teams/TeamId";
import NotFound from "./pages/NotFound";
import Trackers from "./pages/trackers/Trackers";
import TrackerView from "./pages/trackers/id/TrackerView";
import AuthRedirect from "@/pages/auth/AuthRedirect.tsx";
import GetUserData from "@/pages/auth/GetUserData.tsx";

export default createBrowserRouter([
    {
        path: "/",
        children: [
            {index: true, Component: Home},
            {
                path: "auth",
                children: [
                    {
                        index: true,
                        Component: Auth
                    },
                    {
                        path: "token/:token",
                        Component: AuthRedirect
                    },
                    {
                        path: "user-data",
                        Component: GetUserData
                    }
                ]
            },
            {
                path: "logout",
                Component: Logout,
            },
            {
                path: "dash",
                children: [
                    {index: true, Component: Dash},
                    {
                        path: "teams",
                        children: [
                            {index: true, Component: Teams},
                            {path: ":teamId", Component: TeamId}
                        ],
                    },
                    {
                        path: "trackers",
                        children: [
                            {index: true, Component: Trackers},
                            {
                                path: ":trackerId",
                                Component: TrackerView,
                            }
                        ]
                    },
                ]
            },
            {
                path: "*",
                Component: NotFound
            }
        ],
    },
]);