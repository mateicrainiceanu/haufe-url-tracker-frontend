import { createBrowserRouter } from "react-router";
import Home from '@/pages/home/Home';
import Auth from "./pages/auth/Auth";
import Dash from "./pages/dash/Dash";

export default createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, Component: Home },
            { path: "auth", children:
                [
                    {index: true, Component: Auth}
                ]
             },
             {
                path: "dash",
                children: [
                    {index: true, Component: Dash},
                ]
             }
        ],
    },
]);