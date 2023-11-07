import {Component, Inject} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

import {AdminService} from "@core/services/admin.service";
import {ClienteElementTable} from "@core/model/admin/ClienteElementTable";
import Swal from "sweetalert2";
import {InsertClienteModel} from "@core/model/admin/InsertClienteModel";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

  pwdholder:string;

  hide = true;
  formControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
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

    this.pwdholder=this.cliente.password || '';




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
    const form = this.fb.group({
      id: [this.cliente.id],
      codice: [this.cliente.codice, Validators.required],
      riferimento: [this.cliente.riferimento, Validators.required],
      ragioneSociale: [this.cliente.ragioneSociale, Validators.required],
      email: [
        this.cliente.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: [this.cliente.password], // No validators initially
      passwordticket: [this.cliente.passwordticket],
      telefono: [
        this.cliente.telefono,
        [
          Validators.required,
          Validators.pattern(
            "^(\\((00|\\+)39\\)|(00|\\+)39)?(38[890]|34[7-90]|36[680]|33[3-90]|32[89])\\d{7}$"
          ),
        ],
      ],
      alias: [
        this.cliente.alias,
        [
          Validators.required,
          Validators.pattern(
            "^([\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4})(?:,\\s*([\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}))*$"
          ),
        ],
      ],
    });

    const passwordControl = form.get('password');

    // Subscribe to valueChanges event of password control
    passwordControl?.valueChanges.subscribe((value) => {
      passwordControl.setValidators([Validators.maxLength((value!=this.pwdholder) ? 12 : 999)]);
      passwordControl.updateValueAndValidity();
    });

    return form;
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
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
      }
    });
  }

  /*protected readonly ClassicEditor = ClassicEditor;

  updatePassword() {

    this.adminservice.UpdatePasswordCliente(this.cliente.id,this.cliente.password).subscribe({
      next:(res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Password Modificata con Sucesso',
          text: res.message,
          footer: '',
        });
        this.createContactForm();
      },
      error:(res)=>{

      }
    })

  }

  passwordticket="";

  updatePasswordTicket() {

    this.adminservice.UpdatePasswordClienteTicket(this.cliente.id,this.passwordticket).subscribe({
      next:(res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Password Modificata con Sucesso',
          text: res.message,
          footer: '',
        });
        this.createContactForm();
      },
      error:(res)=>{

      }
    })

  }
*/
}
