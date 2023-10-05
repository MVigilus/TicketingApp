import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "@core/guard/auth.guard";
import {Page404Component} from "./wildcard/page404/page404.component";
import {ClienteNotFoundComponent} from "./wildcard/cliente-not-found/cliente-not-found.component";
import {TicketLayoutComponent} from "./layout/app-layout/ticket-layout/ticket-layout.component";
import {MainLayoutComponent} from "./layout/app-layout/main-layout/main-layout.component";
import {AuthLayoutComponent} from "./layout/app-layout/auth-layout/auth-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'gestione',
        loadChildren: () =>
          import('./gestione/gestione.module').then(m => m.GestioneModule),
      }
    ],
  },
  {
    path: 'ticket/:id',
    component: TicketLayoutComponent
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'clienteNotFound',
    component: ClienteNotFoundComponent
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
