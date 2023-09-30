import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NgChartsModule} from "ng2-charts";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgScrollbarModule} from "ngx-scrollbar";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ComponentsModule} from "../utils/components/components.module";
import {SharedModule} from "../utils/shared/shared.module";
import {HomeComponent} from './home/home.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';


@NgModule({
  declarations: [HomeComponent, HomeAdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    NgApexchartsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class DashboardModule {}

