export interface IStatistical {
    key: string;
    description: string;
    color: string;
    icon: JSX.Element;
    value: number;
    valueType: "number" | "curency";
    direction?: "vertical" | "horizontal";
}