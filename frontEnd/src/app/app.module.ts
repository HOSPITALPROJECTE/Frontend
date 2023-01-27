import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthComponent } from './project/components/month/month.component';
import { NavbarComponent } from './project/components/navbar/navbar.component';
import { DayComponent } from './project/components/day/day.component';
import { AgendaComponent } from './project/components/agenda/agenda.component';
import { HistorialComponent } from './project/components/historial/historial.component';
import { LoginComponent } from './project/components/login/login.component';
import { AdminComponent } from './project/components/Admin/admin/admin.component';
import { AdminPlantillaguardiesComponent } from './project/components/Admin/admin-plantillaguardies/admin-plantillaguardies.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminTreballadorsGuardiesComponent } from './project/components/Admin/admin-treballadors-guardies/admin-treballadors-guardies.component';
import { AdminTreballadorsComponent} from './project/components/Admin/admin-treballadors/admin-treballadors.component';
import { AdminFestiusComponent } from './project/components/Admin/admin-festius/admin-festius.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    NavbarComponent,
    DayComponent,
    AgendaComponent,
    HistorialComponent,
    LoginComponent,
    AdminComponent,
    AdminPlantillaguardiesComponent,
    AdminTreballadorsComponent,
    AdminTreballadorsGuardiesComponent,
    AdminFestiusComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
