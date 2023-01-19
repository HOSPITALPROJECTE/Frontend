import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './project/components/month/month.component';
import { DayComponent } from './project/components/day/day.component';
import { AgendaComponent } from './project/components/agenda/agenda.component';
import { HistorialComponent } from './project/components/historial/historial.component';
import { LoginComponent } from './project/components/login/login.component';
import { AdminComponent } from './project/components/Admin/admin/admin.component';
import { AdminFestiusComponent } from './project/components/Admin/admin-festius/admin-festius.component';
import { AdminTreballadorsComponent } from './project/components/Admin/admin-treballadors/admin-treballadors.component';
import { AdminGuardiesComponent } from './project/components/Admin/admin-guardies/admin-guardies.component';
import { AdminPlantillaguardiesComponent } from './project/components/Admin/admin-plantillaguardies/admin-plantillaguardies.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'month', component: MonthComponent },
  { path: 'day', component: DayComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'historial', component: HistorialComponent },
  {path:  'admin', component: AdminComponent},
  {path:  'admin-festius', component:AdminFestiusComponent },
  {path:  'admin-treballadors', component: AdminTreballadorsComponent},
  {path:  'admin-guardies', component: AdminGuardiesComponent},
  {path:  'admin-plantillaguardies', component: AdminPlantillaguardiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
