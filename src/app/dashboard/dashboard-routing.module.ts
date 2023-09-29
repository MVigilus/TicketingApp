import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Page404Component} from "../wildcard/page404/page404.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "../core/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "HomePage",
    pathMatch: "full",
  },
  {
    path: "HomePage",
    component: HomeComponent,
  },

  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
