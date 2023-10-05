import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import {HomeService} from "@core/services/dashboard/home.service";


@Component({
  selector: 'app-edit-operatore-modal',
  templateUrl: './edit-operatore-modal.component.html',
  styleUrls: ['./edit-operatore-modal.component.scss']
})
export class EditOperatoreModalComponent extends UnsubscribeOnDestroyAdapter {


  constructor(@Inject(MAT_DIALOG_DATA) public element: any
    , public dialogRef: MatDialogRef<EditOperatoreModalComponent>,
              public homeservice: HomeService) {
    super();
    //console.log("ELEMENTO"+JSON.stringify(element))
  }

}
