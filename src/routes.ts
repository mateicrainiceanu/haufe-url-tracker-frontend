import { createBrowserRouter } from "react-router";
import Home from '@/pages/home/Home';
import Auth from "./auth/Auth";

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
        ],
    },
]);