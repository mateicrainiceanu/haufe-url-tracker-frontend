import {IQpopup, QpopupLevel, QpopupType, usePopup} from "@/providers/PopupProvider";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import QPopupLayout from "./QPopupLayout";
import {Button} from "../ui/button";

function QPopup({qpopup}: { qpopup: IQpopup }) {
    const {closeQpopup} = usePopup();

    function getColor(lvl: QpopupLevel) {
        switch (lvl) {
            case QpopupLevel.DANGER:
                return "bg-red-500";
            case QpopupLevel.WARN:
                return "bg-yellow-500";
            case QpopupLevel.INFO:
                return "bg-blue-500";
            case QpopupLevel.SUCCESS:
                return "bg-green-500";
            default:
                return "";
        }
    }

    return (
        <QPopupLayout>
            <Card>
                <CardHeader>
                    <CardTitle>{qpopup.title}</CardTitle>
                    <CardDescription>{qpopup.message}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {qpopup.actions.map((action, index) => (
                        <Button
                            key={index}
                            className={`w-full ${getColor(action.level)}`}
                            onClick={() => {
                                action.action();
                                closeQpopup();
                            }}>
                            {action.label}
                        </Button>
                    ))}
                    {qpopup.tp === QpopupType.CONFIRM && (
                        <Button variant="outline" className="w-full" onClick={closeQpopup}>
                            Close
                        </Button>
                    )}
                </CardContent>
                {qpopup.level === QpopupLevel.DANGER && (
                    <CardFooter className="w-full text-xs text-gray-400 text-center">
                        <p className={"text-center w-full"}>
                            This action can't be undone
                        </p>
                    </CardFooter>
                )}
            </Card>
        </QPopupLayout>
    );
}

export default QPopup;
