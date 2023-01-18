import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthComponent } from './project/components/month/month.component';
import { NavbarComponent } from './project/components/navbar/navbar.component';
import { DayComponent } from './project/components/day/day.component';
import { AgendaComponent } from './project/components/agenda/agenda.component';
import { HistorialComponent } from './project/components/historial/historial.component';
import { LoginComponent } from './project/components/login/login.component';
import { AuthenticationComponent } from './project/components/authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    NavbarComponent,
    DayComponent,
    AgendaComponent,
    HistorialComponent,
    LoginComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
