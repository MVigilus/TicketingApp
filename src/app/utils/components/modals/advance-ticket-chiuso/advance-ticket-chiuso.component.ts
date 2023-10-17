import {Component, Inject} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeService} from "@core/services/dashboard/home.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-advance-ticket-chiuso',
  templateUrl: './advance-ticket-chiuso.component.html',
  styleUrls: ['./advance-ticket-chiuso.component.scss']
})
export class AdvanceTicketChiusoComponent extends UnsubscribeOnDestroyAdapter {


  constructor(@Inject(MAT_DIALOG_DATA) public element: any
    , public dialogRef: MatDialogRef<AdvanceTicketChiusoComponent>,
              public homeservice: HomeService) {
    super();
    //console.log("ELEMENTO"+JSON.stringify(element))
  }

  close(): void {
    this.dialogRef.close();
  }

  updateStatus() {
    Swal.fire({
      title: 'Sei Sicuro?',
      text: "Procedo alla chiusura del ticket?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Procedi',
      cancelButtonText: "Annulla"
    }).then((result) => {
      if (result.value) {
        this.subs.sink = this.homeservice.updateStatusTickeChiuso(this.element).subscribe({
          next: res => {
            Swal.fire('Ticket Chiuso!', 'Il ticket è stato chiuso con successo', 'success');
          },
          error: res => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Qualcosa è andato Storto!',
              footer: '' +
                '',
            });
          },
          complete:()=>{
            this.close()
          }
        })

      }
    });

  }

}
