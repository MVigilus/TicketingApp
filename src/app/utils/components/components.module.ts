import {NgModule} from "@angular/core";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {SharedModule} from "../shared/shared.module";
import {ModalTicketViewComponent} from './modals/modal-ticket-view/modal-ticket-view.component';
import {EditOperatoreModalComponent} from './modals/edit-operatore-modal/edit-operatore-modal.component';
import {EditClienteModalComponent} from './modals/edit-cliente-modal/edit-cliente-modal.component';
import {
  AdvanceTicketLavorazioneComponent
} from './modals/advance-ticket-lavorazione/advance-ticket-lavorazione.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { EditLogoClienteComponent } from './modals/edit-logo-cliente/edit-logo-cliente.component';
import { AdvanceTicketChiusoComponent } from './modals/advance-ticket-chiuso/advance-ticket-chiuso.component';
import { LoginTicketComponent } from './modals/login-ticket/login-ticket.component';


@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, ModalTicketViewComponent, EditOperatoreModalComponent, EditClienteModalComponent, AdvanceTicketLavorazioneComponent, EditLogoClienteComponent, AdvanceTicketChiusoComponent, LoginTicketComponent],
  imports: [SharedModule, CKEditorModule],
  exports: [FileUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
