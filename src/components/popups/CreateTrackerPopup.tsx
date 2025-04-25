import {X} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "../ui/button";
import {useState} from "react";
import BeatLdr from "../spinners/BeatLdr";
import {useTracker} from "@/providers/TrackerProvider";

const trackerSchema = z.object({
	url: z.string().min(3, "Link is required"),
	keyword: z.string().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
});

function CreateTrackerPopup({close}: {close: () => void}) {
	const [loading, setLoading] = useState(false);
	const {createTracker} = useTracker();

	type FormData = z.infer<typeof trackerSchema>;

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<FormData>({resolver: zodResolver(trackerSchema)});

	function handle(data: FormData) {
		setLoading(true);
		createTracker(data, () => {
			setLoading(false);
			close();
		});
	}

	return (
		<Card className="relative w-full max-w-md">
			<CardHeader>
				<CardTitle>Create a new tracker</CardTitle>
				<button
					className="absolute top-2 right-2 hover:bg-muted hover:rounded-md p-2 duration-200"
					onClick={close}>
					<X />
				</button>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(handle)}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-3">
							<Label htmlFor="url">Url [mandatory]</Label>
							<Input {...register("url")} type="text" placeholder="Enter the url you want to track" />
							{errors.url && <span className="text-red-500 text-sm">{errors.url.message}</span>}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="keyword">Keyword [optional]</Label>
							<Input
								{...register("keyword")}
								type="text"
								placeholder="Enter the keyword for a custom short url"
							/>
							{errors.keyword && <span className="text-red-500 text-sm">{errors.keyword.message}</span>}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="name">Name [optional]</Label>
							<Input {...register("name")} type="text" placeholder="Enter tracker name" />
							{errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="description">Description [optional]</Label>
							<Input {...register("description")} type="text" placeholder="Enter tracker decription" />
							{errors.description && (
								<span className="text-red-500 text-sm">{errors.description.message}</span>
							)}
						</div>
						<div className="flex flex-col gap-3">
							<Button type="submit" className="w-full" disabled={loading}>
								{!loading ? "Create Tracker" : <BeatLdr />}
							</Button>
							<Button variant="outline" onClick={close}>
								Cancel
							</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

export default CreateTrackerPopup;
