import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take, throwError } from 'rxjs';
import { Month } from '../../model/entities/implementations/Month';
import { DiaGuardiaService } from '../../services/altres/dia-guardia.service';
import { ATreballador } from '../../services/api/treballador/ATreballador';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements AfterViewInit , OnInit {
  month:Month;
  months:Array<string> = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];
  guardiaEstat! : Array<any> 
  unitats! : any;
  guardiesAssignades : Array<any> = [];

  constructor(private diaGuardia : DiaGuardiaService , private router: Router,private elementRef: ElementRef , private httpRequest : ATreballador) {
    this.month = new Month('2023-1');
  }
  ngOnInit(): void {
    localStorage.removeItem("nomDia")
    this.obtenirCategoriaTreballador();
    this.getUnitats();
    this.obtenirGuardiesAmbEstat() // obté guardies d'aquell mes 
  }

  obtenirCategoriaTreballador(){

    this.httpRequest.getCategoriaTreballador().pipe(take(1) , catchError((err: any) => {
        return throwError(()=>{return Error(err)        })
    })).subscribe((res) => {
         localStorage.setItem("categoria" , res.resultat[0].categoria);
    })

  }

  getUnitats(){
      this.httpRequest.getUnitats().pipe(take(1) , catchError((err : any) =>{
        return throwError(()=>{return new Error(err)})
      })).subscribe((res)=>{
          this.unitats = res;
          localStorage.setItem("unitats" , JSON.stringify(res.resultat.dades))
          console.log(this.unitats)
      })
  }

  getDate(year:number, month:string){
    let mes = this.months.indexOf(month) + 1;
    return year + '-' + mes.toString();
  }

  // equivalent a window.onload
  ngAfterViewInit() {
    this.addFuncionalities(); //per afegir events al DOM
    this.showAllMonths(); // Permet escollir un mes qualsevol
    this.onChangeMonth(); //cambiar mes
  }
  addFuncionalities(){
    setTimeout(() => {
      this.addGuardies(); // afegeix les guardies al mes
      //this.addClickEvent_Guardies(); // onclik -> guardia
    }, 0);
  }

  setClassSeason(season:number){
    if (season == 1) return 'hivern';
    else if (season == 2) return 'primavera';
    else if (season == 3) return 'estiu';
    else return 'tardor';
  }
  /* PENDENT DE MODIFICAR addGuardies
  Ha d'agafar les guardes actives/apuntades per treballador
  No les ha de posar per numero de dia sino per data
  */
  addGuardies(){ 
    let dias = this.elementRef.nativeElement.querySelectorAll('.day');
    for (let dia = 0; dia < dias.length; dia++) {
      if(this.month.days[dia].status == 1) dias[dia].classList.add('festivo','applyed')
      else if(this.month.days[dia].status == 2) dias[dia].classList.add('festivo','assigned')
    }
  }

  showAllMonths() {
    document.getElementById('btn_allMonths')?.addEventListener('click', () => document.getElementById('allMonths_box')?.classList.add('active')); // btn.click => show all
    document.querySelector('#allMonths_box .exitMonths')?.addEventListener('click', () => document.getElementById('allMonths_box')?.classList.remove('active')); // btn.click => show all
    // click mes concret
    document.querySelectorAll('#allMonths_box .month_list .month')?.forEach(month => month.addEventListener('click', () => {
      let mes = month.getAttribute('date-filter');
      if(mes!=null)this.month = new Month(mes);
      document.getElementById('allMonths_box')?.classList.remove('active');
      this.addFuncionalities();
    }));
  }

  onChangeMonth(){
    let boto = document.querySelectorAll('#change_month > i');
    boto.forEach(b => b.addEventListener('click', () => {
      // comprovo si es mou un mes endavant o enrrera
      let sumar = true;
      if(b == boto[0]) sumar = false;
      this.month = new Month(this.setNewMonth(sumar));
      this.obtenirGuardiesAmbEstat()
      this.addFuncionalities();
    }))
  }
  
  setNewMonth(sumar:boolean){
    let any = parseInt(this.month.id.substring(0,4));
    let mes = parseInt(this.month.id.substring(5));
    if(sumar){
      // sumar mes
      mes = mes + 1;
      if(mes == 13){
        mes = 1;
        any = any + 1
      }
    }else{
      // restar mes
      mes = mes -1;
      if(mes == 0){
        mes = 12;
        any = any - 1
      }
    }
    return any.toString()+'-'+mes.toString();
  }

  aplicarGuardiesTreballador(res : any){
      this.guardiaEstat = this.obtenirArrayGuardiesEstat(res);
      
      this.month.days.forEach(dia => {
         this.guardiaEstat.forEach(guardia => {
              if(dia.num == guardia.dia_guardia){
                  dia.status = guardia.estat_guardia
              } 
         }); 
      });

      this.addGuardies();
  }

  obtenirArrayGuardiesEstat(res : any){
      let guardies = <Array<any>> res.guardies
      let guardiaEstat : Array<any> = [];
      guardies.forEach( guardia =>{
          let dia = parseInt(<string>this.dateToString( "dd" , guardia.data_guardia));
          let estatNum = (guardia.estat_guardia == "apuntat") ? 1 : 2 ; 
          guardiaEstat.push({
            id_guardia : guardia.id_guardia,
            dia_guardia : dia,
            estat_guardia : estatNum,
            data_guardia : guardia.data_guardia 
          })
          if(estatNum == 2){
            this.guardiesAssignades.push({guardia : guardia.id_guardia,
                                          unitat : guardia.unitat,
                                          estat_guardia : guardia.estat_guardia})
          }
      })

      localStorage.setItem("guardiesAssignades" , JSON.stringify(this.guardiesAssignades))
      return guardiaEstat;
  }

  dateToString( format : string , data:Date){
    return new DatePipe("en-US").transform(data, format);
  }

  obtenirGuardiesAmbEstat(){
        let data = {data : this.month.id} 
        this.httpRequest.obtenirDiesAmbEstat(data).pipe(take(1), catchError((err : any) =>{
         return throwError(()=> {return new Error(err)}) 
        })).subscribe((res) =>{
            console.log(res)
            this.aplicarGuardiesTreballador(res);
        })

  }

  goToDay(dia : any){
    this.diaGuardia.setDia(this.month.id + "-" + dia.num)
    this.carregarGuardiesDia(dia)
  }

  carregarGuardiesDia(dia : any){
    let data = {data : this.obtenirDataGuardia(dia)}

    this.carregarTreballadorPerData(data);

    this.httpRequest.obtenirGuardiesData(data).pipe(take(1), catchError((err : any) =>{
      return throwError(()=> {return new Error(err)}) 
     })).subscribe((res) =>{
        console.log(res)
        this.guardarGuardiesLocalStorage(res)
     })
  }

  carregarTreballadorPerData(data : any){

    this.httpRequest.getGuardiesTreballadorPerData(data).pipe(take(1), catchError((err : any) =>{
      return throwError(()=> {return new Error(err)}) 
     })).subscribe((res) =>{
        localStorage.setItem("unitatsApuntades" ,JSON.stringify(res.resultat));
     })

  }

  guardarGuardiesLocalStorage(res : any){
    let unitats : Array<any> = this.unitats.resultat.dades;
    let guardies : Array<any> = res.resultat.dades;
    let i = 0;
   unitats.forEach(unitat=> {
      let nomClau = "unitatClau_" + i.toString();
      let nomUnitat = unitat.nom;
      let guardiesUnitat : Array<any> = [];
      guardies.forEach((guardia: any) =>{
        if(guardia.unitat == nomUnitat)
          guardiesUnitat.push(guardia)
      })
      localStorage.setItem(nomClau , JSON.stringify({
        nomUnitat : nomUnitat,
        guardies : guardiesUnitat}));
        i++;
    });

    this.router.navigate(['/day'])
  }

  obtenirDataGuardia(dia : any){
    let data : string = "";
    this.guardiaEstat.forEach(guardia =>{
      if(parseInt(guardia.dia_guardia) == parseInt(dia.num))    
          data = <string>this.dateToString( "YYYY-MM-dd" , guardia.data_guardia);
    })

    return data;
  }

}
