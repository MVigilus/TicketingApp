import {NgModule} from "@angular/core";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {SharedModule} from "../shared/shared.module";
import {ModalTicketViewComponent} from './modals/modal-ticket-view/modal-ticket-view.component';


@NgModule({
    declarations: [FileUploadComponent, BreadcrumbComponent, ModalTicketViewComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
