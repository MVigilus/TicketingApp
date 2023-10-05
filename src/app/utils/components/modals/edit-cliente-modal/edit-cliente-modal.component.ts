import {Component, Inject} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

import {AdminService} from "@core/services/admin.service";
import {ClienteElementTable} from "@core/model/admin/ClienteElementTable";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-cliente-modal',
  templateUrl: './edit-cliente-modal.component.html',
  styleUrls: ['./edit-cliente-modal.component.scss']
})
export class EditClienteModalComponent extends UnsubscribeOnDestroyAdapter {


  action: string;
  dialogTitle?: string;
  isDetails = false;
  contactsForm?: UntypedFormGroup;
  cliente: ClienteElementTable;
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  constructor(
    public dialogRef: MatDialogRef<EditClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public adminservice: AdminService,
    private fb: UntypedFormBuilder
  ) {
    super();
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = data.cliente.ragioneSociale;
      this.cliente = data.cliente;
      this.contactsForm = this.createContactForm();
    } else {
      this.isDetails = false;
      this.dialogTitle = 'Nuovo Cliente';
      this.cliente = {} as ClienteElementTable;
      this.contactsForm = this.createContactForm();
    }

    console.log(this.cliente)
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
      id: [this.cliente.id],
      codice: [this.cliente.codice, Validators.required],
      riferimento: [this.cliente.riferimento, Validators.required],
      ragioneSociale: [this.cliente.ragioneSociale, Validators.required],
      email: [
        this.cliente.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      telefono: [this.cliente.telefono, [Validators.required, Validators.pattern("^(\\((00|\\+)39\\)|(00|\\+)39)?(38[890]|34[7-90]|36[680]|33[3-90]|32[89])\\d{7}$")]],
      alias: [this.cliente.alias, [Validators.required, Validators.pattern("^([\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4})(?:,\\s*([\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}))*$")]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.contactsForm?.getRawValue())
    this.adminservice.addCliente(this.contactsForm?.getRawValue()).subscribe({
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
