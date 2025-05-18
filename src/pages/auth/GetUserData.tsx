import {useEffect} from "react";
import api from "@/lib/api.ts";
import {useUser} from "@/providers/UserProviders.tsx";

function GetUserData() {
    const {setUser} = useUser();

    useEffect(()=>{
        api.get("/auth/user-data").then((res) => {

            const {user, token} = res.data;

            setUser(user, token);

            window.location.replace("/dash");
        }).catch();
    }, []);

    return (
        <div className={"h-screen w-full flex flex-wrap justify-center items-center"}> <div className={"max-w-xl"}>Syncing your data</div></div>
    );
}

export default GetUserData;