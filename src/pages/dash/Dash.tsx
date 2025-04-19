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
    </div>
  )
}

export default Dash