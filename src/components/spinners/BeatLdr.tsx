import {BeatLoader} from "react-spinners";

function BeatLdr({color}: {color?: string}) {
	return <BeatLoader size={10} color={color || "white"} />;
}

export default BeatLdr;
