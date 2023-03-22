import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './util/services/material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { InicioComponent } from './page/inicio/inicio.component';
import { ClienteComponent } from './page/cliente/cliente.component';
import { AboutComponent } from './page/about/about.component';
import { FormClienteComponent } from './page/cliente/form-cliente/form-cliente.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {NgxChartsModule} from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ClienteComponent,
    AboutComponent,
    FormClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,

  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
