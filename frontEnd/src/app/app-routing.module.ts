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
import { AdminTreballadorsGuardiesComponent } from './project/components/Admin/admin-treballadors-guardies/admin-treballadors-guardies.component';
import { NavbarComponent } from './project/components/navbar/navbar.component';
import { AdminTreballadorsXGuardiaComponent } from './project/components/admin-treballadors-x-guardia/admin-treballadors-x-guardia.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'', redirectTo: '/login', pathMatch:'full'},
  { path: 'month', component: MonthComponent },
  { path: 'day', component: DayComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'historial', component: HistorialComponent },
  { path:  'navbar', component: NavbarComponent },
  { path:  'admin', component: AdminComponent },
  { path:  'admin-festius', component:AdminFestiusComponent },
  { path:  'admin-treballadors', component: AdminTreballadorsComponent },
  { path:  'admin-treballadors-guardies/:dni', component: AdminTreballadorsGuardiesComponent },
  { path:  'admin-guardies', component: AdminGuardiesComponent },
  { path:  'admin-plantillaguardies', component: AdminPlantillaguardiesComponent },
  { path:  'admin-treballadors-x-guardia', component: AdminTreballadorsXGuardiaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
