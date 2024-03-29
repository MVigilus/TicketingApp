import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GestioneRoutingModule} from './gestione-routing.module';
import {NgChartsModule} from "ng2-charts";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgScrollbarModule} from "ngx-scrollbar";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ComponentsModule} from "../utils/components/components.module";
import {SharedModule} from "../utils/shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestioneRoutingModule,
    NgChartsModule,
    NgApexchartsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class GestioneModule {
}
