import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from "../wildcard/page404/page404.component";
import {GestioneOperatoreComponent} from "./gestione-operatore/gestione-operatore.component";
import {GestioneClienteComponent} from "./gestione-cliente/gestione-cliente.component";
import {GestioneOperatoreFRComponent} from "./gestione-operatore-fr/gestione-operatore-fr.component";
import {GestioneRichiesteComponent} from "./gestione-richieste/gestione-richieste.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "gestioneOperatore",
    pathMatch: "full",
  },
  {
    path: "gestioneOperatore",
    component: GestioneOperatoreComponent,
  },
  {
    path: "gestioneCliente",
    component: GestioneClienteComponent
  },
  {
    path: "gestioneOperatoreFR",
    component: GestioneOperatoreFRComponent
  },
  {
    path: "gestioneRichieste",
    component: GestioneRichiesteComponent
  },
  {path: "**", component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestioneRoutingModule {
}
