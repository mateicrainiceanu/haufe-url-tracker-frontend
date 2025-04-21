import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import React, {useEffect} from "react";
import BeatLdr from "./spinners/BeatLdr";

function Autocomplete({
	options,
	symbol,
	updateOptions,
	onSelect,
	loading,
}: {
	options: {text: string; id: string}[];
	symbol: React.ReactNode;
	updateOptions: (query: string) => void;
	onSelect: (id: string) => void;
	loading: boolean;
}) {
	const [query, setQuery] = React.useState("");

	useEffect(() => {
		const delay = setTimeout(() => {
			updateOptions(query);
		}, 500);

		return () => clearTimeout(delay);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return (
		<Command className="rounded-lg border shadow-md w-full" shouldFilter={false}>
			<CommandInput
				placeholder="Enter an email"
				value={query}
				onInput={(e) => {
					setQuery((e.target as HTMLInputElement).value);
				}}
			/>
			<CommandList>
				<CommandEmpty>
					{loading && <BeatLdr color="black" />}
					{!loading && query.length < 3 && query.length > 0 && "Query must be at least 3 characters"}
					{!loading && query.length >= 3 && options.length === 0 && "No results found"}
					{!loading && query.length === 0 && "Plese search for a user"}
				</CommandEmpty>
				<CommandGroup>
					{options.map((option) => (
						<CommandItem key={option.id} onSelect={() => onSelect(option.id)}>
							{symbol}
							<span>{option.text}</span>
						</CommandItem>
					))}
				</CommandGroup>
				<CommandSeparator />
			</CommandList>
		</Command>
	);
}

export default Autocomplete;
