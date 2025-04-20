import {usePopup, PopupType} from "@/providers/PopupProvider";

function Dash() {
	const {openPopup} = usePopup();

	async function handleClick() {
		openPopup(PopupType.CREATE_TEAM);
	}

	return (
		<div>
			<button onClick={handleClick}>Click me</button>
		</div>
	);
}

export default Dash;
