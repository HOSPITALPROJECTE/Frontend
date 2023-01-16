import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonthComponent } from './project/components/month/month.component';
import { DayComponent } from './project/components/day/day.component';
import { AgendaComponent } from './project/components/agenda/agenda.component';
import { HistorialComponent } from './project/components/historial/historial.component';

const routes: Routes = [
  { path: 'month', component: MonthComponent },
  { path: 'day', component: DayComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'historial', component: HistorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
