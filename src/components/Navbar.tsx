import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {useUser} from "@/providers/UserProviders";
import NavTeamSelector from "./NavTeamSelector";

function Navbar() {
	const {user} = useUser();

	const navs = [
		{title: "Home", dest: "/", show: user === null},
		{title: "Login", dest: "/auth", show: user === null},
		{title: "Dash", dest: "/dash", show: user !== null},
		{title: "Logout", dest: "/logout", show: user !== null},
	];

	window.onscroll = function () {
		console.log("scroll");
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			document.querySelector("nav")?.classList.add("sm-shadow");
		} else {
			document.querySelector("nav")?.classList.remove("sm-shadow");
		}
	};

	return (
		<nav className="w-full px-10 py-6 my-3 sticky top-0 bg-white m-1 z-49 transition-shadow duration-200">
			<div className="max-w-5xl mx-auto flex items-center justify-between">
				<div className="text-xl font-semibold">url.io</div>

				<NavigationMenu className="">
					<NavigationMenuList className="flex space-x-4">
						{user && <NavTeamSelector />}
						{navs
							.filter((item) => item.show)
							.map((item, i) => (
								<NavigationMenuItem key={i}>
									<NavigationMenuLink
										href={item.dest}
										className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
										{item.title}
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</nav>
	);
}

export default Navbar;
