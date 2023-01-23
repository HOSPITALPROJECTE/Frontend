import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonthComponent } from './project/components/month/month.component';
import { DayComponent } from './project/components/day/day.component';
import { AgendaComponent } from './project/components/agenda/agenda.component';
import { HistorialComponent } from './project/components/historial/historial.component';
import { LoginComponent } from './project/components/login/login.component';
import { NavbarComponent } from './project/components/navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'', redirectTo: '/login', pathMatch:'full'},
  { path: 'month', component: MonthComponent },
  { path: 'day', component: DayComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'historial', component: HistorialComponent },
  {path: 'navbar', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
