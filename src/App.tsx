import {RouterProvider} from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./routes";
import UserProvider from "./providers/UserProviders";

function App() {
	return (
		<UserProvider>
			<main className="min-w-vw min-h-svh">
				<Navbar />
				<RouterProvider router={routes}></RouterProvider>
			</main>
		</UserProvider>
	);
}

export default App;
