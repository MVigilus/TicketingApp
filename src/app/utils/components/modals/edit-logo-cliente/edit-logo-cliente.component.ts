import {Component, Inject} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ClienteElementTable} from "@core/model/admin/ClienteElementTable";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminService} from "@core/services/admin.service";
import Swal from "sweetalert2";
import {UnsubscribeOnDestroyAdapter} from "../../../UnsubscribeOnDestroyAdapter";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-edit-logo-cliente',
  templateUrl: './edit-logo-cliente.component.html',
  styleUrls: ['./edit-logo-cliente.component.scss']
})
export class EditLogoClienteComponent extends UnsubscribeOnDestroyAdapter {

  dialogTitle?: string;
  isDetails = false;
  contactsForm?: UntypedFormGroup;
  cliente: number;
  clientecode:string;
  formControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
  ]);

  logoUrl!: SafeUrl;

  constructor(
    public dialogRef: MatDialogRef<EditLogoClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public adminservice: AdminService,
    private fb: UntypedFormBuilder,
    private sanitizer: DomSanitizer
  ) {
    super();
    // Set the defaults
    this.isDetails = false;
    this.dialogTitle = data.ragioneSociale;
    this.cliente = data.cliente;
    this.clientecode=data.code
    this.contactsForm = this.createContactForm();

    this.subs.sink=this.adminservice.getLogoCliente(this.clientecode).subscribe({
      next:(data) => {
      const blob = new Blob([data], { type: 'image/png' });
      this.logoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    },
      error:res=>{

      }
    })

    console.log(this.clientecode)
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
      id:[this.cliente],
      file:['',Validators.required]
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
    this.adminservice.addLogoCliente(this.contactsForm?.getRawValue().file,this.contactsForm?.getRawValue().id).subscribe({
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
      error: (res) => {
        if(res==="OK"){
          Swal.fire({
            icon: 'success',
            title: 'Operazione effettuata con successo',
            text: res.message,
            footer: '',
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'AAAAAA!',
            footer: '' +
              '',
          });
        }

      },
    });
  }

}
