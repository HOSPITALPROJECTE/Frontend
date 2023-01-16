import { IMonth } from "../interfaces/IMonth";
import { Day } from "./Day";

export class Month implements IMonth{
    name!: string;
    year!: number;
    id!: string;
    season!: number;
    days: Array<Day> = [];

    constructor(id:string){
        this.id = id;
        let month = new Date(id);
        this.setSeason(month.getMonth());
        this.setName(month.getMonth());
        this.setDays(month);
    }
    private setSeason(month:Number){
        if (month<2 || month == 11) this.season = 1;
        else if (month<5) this.season = 2;
        else if (month<8) this.season = 3;
        else this.season = 4
    }
    private setName(month:number) {
        let monthName = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];
        this.name = monthName[month];
    }
    private setDays(date: Date) {
        let month = date.getMonth();
        let year = date.getFullYear();
        this.year = year;
        let numDays = new Date(year, month + 1, 0).getDate();

        this.setNullDays(date)
        this.setAllDays(numDays)

    }
    /* agafeixo dies en null pq el dia 1 comenci el dia de setmana que li pertoca */
    private setNullDays(date: Date) {
        let firstDay = date.getDay();
        if (firstDay == 0) firstDay = 7;

        for(let i = 1; i<firstDay; i++){
            this.days.push(new Day(0));
        }
    }
    private setAllDays(num:number){
        for(let i = 1; i<=num; i++){
            let day = new Day(i);
            day.setHolidays(this.days.length + 1);
            this.days.push(day)
        }
    }
}