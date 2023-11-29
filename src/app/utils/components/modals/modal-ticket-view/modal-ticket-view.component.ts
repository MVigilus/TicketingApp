import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {HomeService} from "@core/services/dashboard/home.service";
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-modal-ticket-view',
  templateUrl: './modal-ticket-view.component.html',
  styleUrls: ['./modal-ticket-view.component.scss']
})
export class ModalTicketViewComponent extends UnsubscribeOnDestroyAdapter {


  public Editor: any = ClassicEditor;
  noteLavorazione:string;


  constructor(@Inject(MAT_DIALOG_DATA) public element: any
      , public dialogRef: MatDialogRef<ModalTicketViewComponent>,
              public homeservice: HomeService,
              private authservice:AuthService) {
    super();
    this.noteLavorazione=element.element.noteOperatore;
    //console.log("ELEMENTO"+JSON.stringify(element))
  }

  get CU(){
    return this.authservice.currentUserValue
  }

  close(): void {
    this.dialogRef.close();
  }

  updateNoteLavorazione() {
    this.subs.sink = this.homeservice.updateNoteLavorazioneTicket(this.element.element.id,this.noteLavorazione).subscribe({
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
}
