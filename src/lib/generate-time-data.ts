import { IAccessLog } from "@/providers/AccessLogsProvider";

export function generateTimeData(data: IAccessLog[]) {
    const arr: { date: string; visitors: number }[] = [];

    data.map(item => {
        const date = new Date(item.createdAt);
        const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD

        const existingItem = arr.find((obj: { date: string }) => obj.date === formattedDate);

        if (existingItem) {
            existingItem.visitors += 1;
        } else {
            arr.push({
                date: formattedDate,
                visitors: 1,
            });
        }
    });

    return arr;
}