import {useEffect} from "react";

function Logout() {
	useEffect(() => {
		localStorage.clear();
		window.location.replace("/");
	}, []);

	return <div className="w-full h-full flex items-center justify-center">Logging out ...</div>;
}

export default Logout;
