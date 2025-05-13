import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {useUser} from "@/providers/UserProviders";
import NavTeamSelector from "./NavTeamSelector";
import {SidebarTrigger, useSidebar} from "./ui/sidebar";
import {motion} from "framer-motion";

function Navbar() {
	const {user} = useUser();
	const {open} = useSidebar();

	const navs = [
		{title: "Home", dest: "/", show: user === null},
		{title: "Login", dest: "/auth", show: user === null},
		{title: "Dash", dest: "/dash", show: user !== null},
		{title: "Logout", dest: "/logout", show: user !== null},
	];

	if (!open || user === null)
		return (
			<motion.div
				className="sticky top-0 bg-background/90 backdrop-blur-sm border-b border-muted shadow-sm z-50"
				initial={{opacity: 0, y: -100}}
				animate={{opacity: 1, y: 0}}
				exit={{opacity: 0, y: -100}}
				transition={{duration: 0.2}}>
				<nav className="w-full px-10 py-6 my-3  m-1 z-49 transition-shadow duration-200">
					<div className="max-w-5xl mx-auto flex items-center justify-between">
						<div className="flex gap-4 items-center">
							{user !== null && <SidebarTrigger className="text-2xl" />}
							<div className="text-xl font-semibold">url.io</div>
						</div>

						<NavigationMenu className="">
							<NavigationMenuList className="flex space-x-4">
								{user && <NavTeamSelector />}
								{navs
									.filter((item) => item.show)
									.map((item, i) => (
										<NavigationMenuItem key={i}>
											<NavigationMenuLink
												href={item.dest}
												className="text-sm font-medium text-foreground transition-colors">
												{item.title}
											</NavigationMenuLink>
										</NavigationMenuItem>
									))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</nav>
			</motion.div>
		);
	else
		return (
			<>
				<nav className="md:hidden">
					<SidebarTrigger className="m-3"/>
				</nav>
			</>
		);
}

export default Navbar;
