import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationRoutingModule} from "../authentication/authentication-routing.module";
import {SharedModule} from "../utils/shared/shared.module";
import {MaterialModule} from "../utils/material/material.module";
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ComponentsModule} from "../utils/components/components.module";
import {AppModule} from "../app.module";
import {HeaderComponent} from "./header/header.component";
import {NgScrollbarModule} from "ngx-scrollbar";


@NgModule({
  declarations: [
    LoginPageComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    ClienteRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    ComponentsModule,
    NgScrollbarModule
  ]
})
export class ClienteModule { }
