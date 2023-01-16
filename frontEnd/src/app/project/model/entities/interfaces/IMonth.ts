import { IDay } from "./IDay";

export interface IMonth{
    name: string;
    id: string;
    season: number;
    days: Array<IDay>;
}