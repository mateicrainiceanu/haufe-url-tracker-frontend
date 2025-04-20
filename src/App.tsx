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
							<div className="w-full max-w-5xl px-10 mx-auto mb-2">
								<RouterProvider router={routes}></RouterProvider>
							</div>
						</main>
					</PopupProvider>
				</TeamProvider>
			</UserProvider>
		</AlertProvider>
	);
}

export default App;
