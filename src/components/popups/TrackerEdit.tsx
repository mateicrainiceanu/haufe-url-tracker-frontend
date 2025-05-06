import QPopupLayout from "@/components/popups/QPopupLayout.tsx";
import {ITracker, useTracker} from "@/providers/TrackerProvider.tsx";
import {X} from "lucide-react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";

function TrackerEdit({trackerData, close}: { trackerData: ITracker, close: () => void }) {

    const [tData, setTData] = useState(trackerData);
    const [loading, setLoading] = useState(false);

    const {updateTracker} = useTracker();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setTData({...tData, [e.target.id]: e.target.value});
    }

    async function handleSubmit() {
        setLoading(true);
        updateTracker(trackerData.id, tData);
        setLoading(false);
        close();
    }

    return (
        <QPopupLayout>
            <Card className="relative w-full">
                <CardHeader>
                    <CardTitle>Edit Tracker</CardTitle>
                    <CardDescription>Edit the tracker {trackerData.name}</CardDescription>
                    <button className="absolute hover:bg-muted rounded-md right-2 top-2 p-2" onClick={close}><X/>
                    </button>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-5">
                            <div className={"flex flex-col gap-2"}>

                                <Label htmlFor="name">Name</Label>
                                <Input type="text" placeholder="Change Tracker Name" id="name" value={tData.name}
                                       onChange={handleChange}/>
                            </div>
                            <div className={"flex flex-col gap-2"}>

                                <Label htmlFor="description">Description</Label>
                                <Input type="text" placeholder="Change Tracker Desc" id="description"
                                       value={tData.description} onChange={handleChange}/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className={"flex gap-2 justify-end w-full"}>
                        <Button variant={"outline"} onClick={close}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            Save
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </QPopupLayout>
    );
}

export default TrackerEdit;