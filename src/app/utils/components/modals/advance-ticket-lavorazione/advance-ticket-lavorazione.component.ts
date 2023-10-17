import {Component, Inject} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeService} from "@core/services/dashboard/home.service";
import Swal from "sweetalert2";
import {TicketTableElement} from "@core/model/ticketing/TicketTableElement";

@Component({
  selector: 'app-advance-ticket-lavorazione',
  templateUrl: './advance-ticket-lavorazione.component.html',
  styleUrls: ['./advance-ticket-lavorazione.component.scss']
})
export class AdvanceTicketLavorazioneComponent extends UnsubscribeOnDestroyAdapter {


  constructor(@Inject(MAT_DIALOG_DATA) public element: any
    , public dialogRef: MatDialogRef<AdvanceTicketLavorazioneComponent>,
              public homeservice: HomeService) {
    super();
    //console.log("ELEMENTO"+JSON.stringify(element))
  }

  close(): void {
    this.dialogRef.close();
  }

  updateStatus() {
    this.subs.sink = this.homeservice.updateStatusTicketLavorazione(this.element.element).subscribe({
      next: (res: any) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Operazione effettuata con successo',
            text: 'Stato Ticket modificato In Lavorazione\n' +
              '\n' +
              '                                  Inviata notifica Mail al Cliente sullo stato di Avanzamento',
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
      complete:()=>{
        this.close();
      }
    });
  }

}
