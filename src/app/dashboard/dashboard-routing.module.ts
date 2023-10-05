import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from "../wildcard/page404/page404.component";
import {HomeComponent} from "./home/home.component";
import {HomeAdminComponent} from "./home-admin/home-admin.component";
import {AdminGuard} from "@core/guard/admin.guard";
import {ProfileComponent} from "./profile/profile.component";

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
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "HomePageAdmin",
    component: HomeAdminComponent,
    canActivate: [AdminGuard]
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
