import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DevKey, useTeams} from "@/providers/TeamProvider.tsx";
import {useState} from "react";
import {Copy, Eye, EyeOff, Trash2} from "lucide-react";
import {useAlert} from "@/providers/AlertProvider.tsx";
import api from "@/lib/api.ts";

function TeamKeyRow({devKey}: { devKey: DevKey }) {

    const {addAlert, handleAxiosError} = useAlert();
    const {fetchTeams} = useTeams();

    const [hide, setHide] = useState(true);

    function handleDelete() {
        api.delete("/dev/config/api-key/" + devKey.id).then(async () => {
            await fetchTeams();
            addAlert({
                variant: "success",
                title: "Deleted!",
                message: "The key was successfully deleted!"
            });
            window.location.reload();
        }).catch(handleAxiosError)
    }

    function toggleHide() {
        setHide(h=> !h);
    }

    function handleCopy() {
        window.navigator.clipboard.writeText(devKey.id).then(() => {
            addAlert({
                variant: "success",
                title: "Copied!",
                message: "The key was successfully copied to your clipboard!"
            });
        }).catch(() => {

        });
    }

    return (
        <TableRow key={devKey.id}>
            <TableCell className={hide? "select-none" :""}>{hide ? devKey.id.slice(0, 9) + "********" : devKey.id}</TableCell>
            <TableCell className={"flex justify-end gap-2"}>
                <Button onClick={toggleHide}> {!hide ? <EyeOff/> : <Eye />} </Button>
                <Button onClick={handleCopy} variant={"outline"}><Copy /></Button>
                <Button onClick={handleDelete} variant={"destructive"}><Trash2/></Button>
            </TableCell>
        </TableRow>
    );
}

export default TeamKeyRow;