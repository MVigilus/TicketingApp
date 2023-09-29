import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../utils/shared/shared.module";
import {TicketLayoutComponent} from "./ticket-layout/ticket-layout.component";
import {ComponentsModule} from "../utils/components/components.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { AdminLayoutComponent } from './app-layout/admin-layout/admin-layout.component';
@NgModule({
  imports: [CommonModule, SharedModule,ComponentsModule,CKEditorModule],
  declarations: [

  
    AdminLayoutComponent
  ]
})
export class LayoutModule {}
