import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {ITeam} from "@/providers/TeamProvider.tsx";
import TeamKeysCard from "@/components/teams/TeamKeysCard.tsx";

function TeamKeySection({team}: {team: ITeam}) {
    const [show, setShow] = useState(true)
    return (
        <>
            <div className={"flex"}>
                <Button
                    variant={"secondary"}
                    onClick={() => {
                        setShow(prev => !prev)
                    }}>{show ? "Close api keys" : "Show api keys"}</Button>
            </div>
            {show && <TeamKeysCard team={team} />}
        </>
    );
}

export default TeamKeySection;