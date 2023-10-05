import {NgModule} from "@angular/core";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {SharedModule} from "../shared/shared.module";
import {ModalTicketViewComponent} from './modals/modal-ticket-view/modal-ticket-view.component';
import {EditOperatoreModalComponent} from './modals/edit-operatore-modal/edit-operatore-modal.component';
import {EditClienteModalComponent} from './modals/edit-cliente-modal/edit-cliente-modal.component';


@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, ModalTicketViewComponent, EditOperatoreModalComponent, EditClienteModalComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
