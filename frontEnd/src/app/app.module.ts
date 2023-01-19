import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { HttpClientModule } from '@angular/common/http';


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
    AdminPlantillaguardiesComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
