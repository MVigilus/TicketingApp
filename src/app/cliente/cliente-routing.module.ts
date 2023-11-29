import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ClienteAuthenticationGuard} from "@core/guard/cliente-authentication.guard";
import {LoginPageComponent} from "./login-page/login-page.component";

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
    path: "signin/:id",
    component: LoginPageComponent,
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[ClienteAuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {
}
