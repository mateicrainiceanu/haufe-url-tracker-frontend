import {Card} from "@/components/ui/card";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table";

function Trackers() {
	return (
		<div>
			<h1>Trackers</h1>
			<Card className="p-5">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Id</TableHead>
							<TableHead>Link</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			</Card>
		</div>
	);
}

export default Trackers;
