import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthComponent } from './project/components/month/month.component';
import { NavbarComponent } from './project/components/navbar/navbar.component';
import { DayComponent } from './project/components/day/day.component';
import { AgendaComponent } from './project/components/agenda/agenda.component';
import { HistorialComponent } from './project/components/historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    NavbarComponent,
    DayComponent,
    AgendaComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
