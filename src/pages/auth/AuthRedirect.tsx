import {useParams} from "react-router";
import {useEffect} from "react";

function AuthRedirect() {

    const {token} = useParams();

    useEffect(()=>{
        localStorage.clear();
        localStorage.setItem("token", token!);

        window.location.replace("/auth/user-data")
    }, []);

    return (
        <div className={"h-screen w-full flex flex-wrap justify-center items-center"}> <div className={"max-w-xl"}>Logging you in {token}</div></div>
    );
}

export default AuthRedirect;