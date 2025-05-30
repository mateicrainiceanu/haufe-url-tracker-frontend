import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import NavTeamSelector from "@/components/NavTeamSelector";
import {useUser} from "@/providers/UserProviders";
import {Home, LayoutDashboard, LocateFixed, LogIn, LogOut, User, Users} from "lucide-react";
import {Button} from "./ui/button";

export function AppSidebar() {
	const {user} = useUser();

	const path = window.location.pathname;

	const navs = [
		{title: "Home", dest: "/", show: user !== null, icon: Home, selected: path === "/"},
		{title: "Login", dest: "/auth", show: user === null, icon: LogIn, selected: path === "/auth"},
		{title: "Dash", dest: "/dash", show: user !== null, icon: LayoutDashboard, selected: path === "/dash"},
		{title: "Teams", dest: "/dash/teams", show: user !== null, icon: Users, selected: path.includes("/dash/teams")},
		// {title: "Dash", dest: "/dash", show: user !== null, icon: LayoutDashboard},
	];

	return (
		<>
			{user !== null && (
				<Sidebar className="select-none">
					<SidebarHeader>
						<div className="flex m-4">
							<div className="text-xl font-semibold">url.io</div>
							<SidebarTrigger className="ms-auto text-2xl" />
						</div>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarMenu>
								{navs
									.filter((item) => item.show)
									.map((item) => (
										<SidebarMenuItem key={item.title} >
											<SidebarMenuButton asChild className={`${item.selected ? "bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 hover:dark:bg-gray-500" : ""}`}>
												<a href={item.dest}>
													<item.icon className="text-sidebar-foreground" />
													<span className="text-sidebar-foreground">{item.title}</span>
												</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
							</SidebarMenu>
						</SidebarGroup>
						<SidebarGroup className="px-3">
							<NavTeamSelector></NavTeamSelector>
						</SidebarGroup>
						<SidebarGroup>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton asChild className={`${path.includes("/dash/trackers") ? "bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 hover:dark:bg-gray-500" : ""}`}>
										<a href={"/dash/trackers"}>
											<LocateFixed className="text-sidebar-foreground" />
											<span className="text-sidebar-foreground">Trackers</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<div className="bg-muted rounded-md m-2 p-2">
							<div className="flex flex-row gap-2 items-center my-2">
								<User />
								{user.email}
							</div>
							<Button
								variant="outline"
								className="w-full"
								onClick={() => {
									window.location.replace("/logout");
								}}>
								Logout <LogOut />
							</Button>
						</div>
						<span className="text-right text-gray-300">
							MateiCrainiceanu©{new Date(Date.now()).getFullYear()} v1.dev
						</span>
					</SidebarFooter>
				</Sidebar>
			)}
		</>
	);
}
