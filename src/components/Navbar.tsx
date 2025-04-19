import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/providers/UserProviders";

function Navbar() {
	const {user} = useUser();

	const navs = [
		{title: "Home", dest: "/", show: true},
		{title: "Login", dest: "/auth", show: user === null},
		{title: "Dash", dest: "/dash", show: user !== null},
	];

	return (
		<nav className="w-full px-4 my-3 sticky top-0">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="text-xl font-semibold">url.io</div>

				<NavigationMenu>
					<NavigationMenuList className="flex space-x-4">
						{navs.filter(item => item.show).map((item, i) => (
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
