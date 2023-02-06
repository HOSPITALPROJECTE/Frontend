import { IMonth } from "../interfaces/IMonth";
import { Day } from "./Day";

export class Month implements IMonth{
    name!: string;
    year!: number;
    id!: string;
    season!: number;
    days: Array<Day> = [];
    guardies! : Array<Array<number>>

    constructor(id:string /*array amb guardies i estat*/){
        this.id = id;
        let month = new Date(id); // data mes el nom del dia i hora
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
        let numDays = new Date(year, month + 1, 0).getDate(); // numero de dies que té el mes

        this.setNullDays(date)
        this.setAllDays(numDays)

    }
    /* agafeixo dies en null pq el dia 1 comenci el dia de setmana que li pertoca */
    private setNullDays(date: Date) {
        let firstDay = date.getDay(); // primer dia del mes segons el que pasem
        if (firstDay == 0) firstDay = 7;

        for(let i = 1; i<firstDay; i++){
            this.days.push(new Day(0));
        }
    }
    private setAllDays(num:number){
        for(let i = 1; i<=num; i++){
            let day = new Day(i);
            day.setHolidays(this.days.length + 1 , );
            this.days.push(day)
        }
    }

}