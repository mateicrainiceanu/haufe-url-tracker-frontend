import {RouterProvider} from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./routes";
import UserProvider from "./providers/UserProviders";
import AlertProvider from "./providers/AlertProvider";
import TeamProvider from "./providers/TeamProvider";
import PopupProvider from "./providers/PopupProvider";
import {SidebarProvider} from "./components/ui/sidebar";
import {AppSidebar} from "./components/AppSidebar";

function App() {
	return (
		<SidebarProvider>
			<AlertProvider>
				<UserProvider>
					<TeamProvider>
						<PopupProvider>
							<AppSidebar />
							<main className=" w-full min-h-svh">
								<Navbar />
								<div className="w-full max-w-5xl px-10 my-10 mx-auto mb-2">
									<RouterProvider router={routes}></RouterProvider>
								</div>
							</main>
						</PopupProvider>
					</TeamProvider>
				</UserProvider>
			</AlertProvider>
		</SidebarProvider>
	);
}

export default App;
