import { IDay } from "../interfaces/IDay";

export class Day implements IDay {
    num!: number;
    holiday: boolean = false;
    status: number = 0; /* 0 == '', 1 == 'applyed', 2 == 'assigned' */

    constructor(num:number) {
        this.num = num;
    }
    public setHolidays(position:number ){
        if (Number.isInteger(position/7)) this.holiday = true; // cambiar?
        this.addGuardiaStatus();
    }
    addGuardiaStatus(/*array dies*/ ) {
        let guardies = [[]] // guardies amb estat
        for (let i = 0; i < guardies.length; i++){
            if(this.num == guardies[i][0]) this.status = guardies[i][1]
        }
    }
}