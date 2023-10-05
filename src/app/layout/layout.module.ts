import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../utils/shared/shared.module";
import {ComponentsModule} from "../utils/components/components.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  imports: [CommonModule, SharedModule,ComponentsModule,CKEditorModule],
  declarations: []
})
export class LayoutModule {}
