import { ChartConfig } from "@/components/ui/chart";

export function generateDonoughtData(data: never[], dataKey: string) {
    const arr: { name: string, value: number }[] = [];

    const config: Record<string, { color: string }> = {} satisfies ChartConfig;

    data.map(item => {
        const value = item[dataKey];

        if (value) {
            const existingItem = arr.find((obj: { name: string }) => obj.name === value);

            if (existingItem) {
                existingItem.value += 1;
            } else {
                arr.push({
                    name: value,
                    value: 1,
                });
                config[value] = {
                    color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
                };
            }
        }
    })

    console.log("arr", arr);
    console.log("config", config);
    return { arr, config };
}