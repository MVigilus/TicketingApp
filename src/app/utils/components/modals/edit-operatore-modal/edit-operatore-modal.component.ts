import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AdminService} from "@core/services/admin.service";
import Swal from "sweetalert2";
import {OperatoreElementTable} from "@core/model/admin/OperatoreElementTable";


@Component({
  selector: 'app-edit-operatore-modal',
  templateUrl: './edit-operatore-modal.component.html',
  styleUrls: ['./edit-operatore-modal.component.scss']
})
export class EditOperatoreModalComponent extends UnsubscribeOnDestroyAdapter implements OnInit {


  action!: string;
  dialogTitle?: string;
  isDetails = false;
  contactsForm!: UntypedFormGroup;
  operatore!: OperatoreElementTable;
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  clienti: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditOperatoreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public adminservice: AdminService,
    private fb: UntypedFormBuilder
  ) {
    super();
    this.clienti = data.clienti
    this.action = data.action;

    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = data.operatore.nominativo;
      this.operatore = data.operatore;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'Nuovo Operatore';
      this.operatore = {} as OperatoreElementTable;
    }

    this.contactsForm = this.createContactForm();
    this.contactsForm?.get('clienti')?.setValue(this.operatore.clienti);


  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.operatore.id],
      nominativo: [this.operatore.nominativo, Validators.required],
      email: [this.operatore.email, Validators.required],
      username: [this.operatore.username, Validators.required],
      clienti: [this.clienti, Validators.required]
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.adminservice.insertOperatore(this.contactsForm?.getRawValue()).subscribe({
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
      complete: () => {
        this.dialogRef.close();
      }
    });
  }

  ngOnInit(): void {

  }
}
