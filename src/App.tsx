import {RouterProvider} from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./routes";
import UserProvider from "./providers/UserProviders";
import AlertProvider from "./providers/AlertProvider";
import TeamProvider from "./providers/TeamProvider";
import PopupProvider from "./providers/PopupProvider";

function App() {
	return (
		<AlertProvider>
			<UserProvider>
				<TeamProvider>
					<PopupProvider>
						<main className="min-w-vw min-h-svh">
							<Navbar />
							<RouterProvider router={routes}></RouterProvider>
						</main>
					</PopupProvider>
				</TeamProvider>
			</UserProvider>
		</AlertProvider>
	);
}

export default App;
