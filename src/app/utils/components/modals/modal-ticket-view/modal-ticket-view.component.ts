import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {HomeService} from "@core/services/dashboard/home.service";
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-modal-ticket-view',
  templateUrl: './modal-ticket-view.component.html',
  styleUrls: ['./modal-ticket-view.component.scss']
})
export class ModalTicketViewComponent extends UnsubscribeOnDestroyAdapter {


  public Editor: any = ClassicEditor;
  constructor(@Inject(MAT_DIALOG_DATA) public element: any
      , public dialogRef: MatDialogRef<ModalTicketViewComponent>,
              public homeservice: HomeService) {
    super();
    //console.log("ELEMENTO"+JSON.stringify(element))
  }

  close(): void {
    this.dialogRef.close();
  }

  updateStatus() {
    this.subs.sink = this.homeservice.updateStatusTicket(this.element.element.id).subscribe({
      next: (res: any) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Operazione effettuata con successo',
            text: res.message,
            footer: '',
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '' +
              '',
        });
      },
    });
  }

  protected readonly ClassicEditor = ClassicEditor;
}
