import AlertMsg from "@/components/AlertMsg";
import api from "@/lib/api"

function Dash() {

    async function handleClick(){
        const response = await api.get("/");
        console.log(response);
    }

  return (
    <div>
        <button onClick={handleClick}>
            Click me
        </button>
        <AlertMsg title="Error" message="error" variant="error"/>
        <AlertMsg title="Error" message="error" variant="warning"/>
        <AlertMsg title="Error" message="error" variant="info"/>
        <AlertMsg title="Error" message="error" variant="success"/>
    </div>
  )
}

export default Dash