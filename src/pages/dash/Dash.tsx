import {useAlert} from "@/providers/AlertProvider";

function Dash() {
	const {addAlert} = useAlert();

	async function handleClick() {
		addAlert({variant: "success", title: "Success", message: "This is a success message"});
	}

	return (
		<div>
			<button onClick={handleClick}>Click me</button>
		</div>
	);
}

export default Dash;
