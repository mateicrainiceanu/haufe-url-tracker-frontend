import {useEffect} from "react";

function Logout() {
	useEffect(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("user-id");
		localStorage.removeItem("user-email");
		window.location.replace("/");
	}, []);

	return <div className="w-full h-full flex items-center justify-center">Logging out ...</div>;
}

export default Logout;
