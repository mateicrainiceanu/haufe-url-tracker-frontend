import {RouterProvider} from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./routes";

function App() {
	return (
		<main className="min-w-vw min-h-svh">
			<Navbar />
			<RouterProvider router={routes}></RouterProvider>
		</main>
	);
}

export default App;
