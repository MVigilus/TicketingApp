import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {LoginPageComponent} from "./login-page/login-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../utils/shared/shared.module";
import {MaterialModule} from "../utils/material/material.module";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";


@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotPasswordComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
        SharedModule,
        MaterialModule,
        CKEditorModule
    ]
})
export class AuthenticationModule { }
