import {Component, Inject} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeService} from "@core/services/dashboard/home.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login-ticket',
  templateUrl: './login-ticket.component.html',
  styleUrls: ['./login-ticket.component.scss']
})
export class LoginTicketComponent extends UnsubscribeOnDestroyAdapter {

  password:string="";


  constructor(@Inject(MAT_DIALOG_DATA) public element: any,
    public dialogRef: MatDialogRef<LoginTicketComponent>,
              public homeservice: HomeService) {
    super();

    //console.log("ELEMENTO"+JSON.stringify(element))
  }

  close(): void {
    this.dialogRef.close();
  }

  Accedi() {
    console.log(this.password)
    this.subs.sink = this.homeservice.checkClientePassword(this.element,this.password).subscribe({
      next: res => {
        if(res){
          this.close()
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Password Errata',
            text: '',
            footer: '' +
              '',
          });
        }
      },
      error: res => {
        Swal.fire({
          icon: 'error',
          title: 'Password Errata',
          text: '',
          footer: '' +
            '',
        });
      }
    })

  }

}
