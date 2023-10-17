import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Page505Component} from "../wildcard/page505/page505.component";
import {Page404Component} from "../wildcard/page404/page404.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
  {
    path: "signin",
    component: LoginPageComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  /*{
    path: "locked",
    component: LockedComponent,
  },*/
  {
    path: "page404",
    component: Page404Component,
  },
  {
    path: "page500",
    component: Page505Component,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}

