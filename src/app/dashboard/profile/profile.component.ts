import {Component, OnInit} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {AdminService} from "@core/services/admin.service";
import {
  AbstractControl,
  FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AuthService} from "@core/services/auth.service";
import {ErrorStateMatcher} from "@angular/material/core";
import {Editprofile} from "@core/model/Editprofile";
import Swal from "sweetalert2";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  register?: UntypedFormGroup;
  hide = true;

  constructor(private adminService:AdminService,
              private fb:FormBuilder,
              private authService:AuthService
              ) {
    super();
    this.initForm()
  }

  private get cU(){
    return this.authService.currentUserValue
  }

  matcher = new MyErrorStateMatcher();

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = this.register?.get('password')?.value;
    let confirmPass = this.register?.get('password2')?.value
    return pass === confirmPass ? null : { notSame: true }
  }


  initForm() {
    this.register = this.fb.group({
      id: [this.cU.id],
      nominativo: [this.cU.nominativo, [Validators.required]],
      username: [this.cU.username, Validators.required],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      email: [
        this.cU.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    }, { validators: this.checkPasswords });
  }

  ngOnInit(): void {
  }

  onRegister() {

  }

  editProfile!:Editprofile
  EditProfile() {
    this.editProfile={
      id:this.register?.get('id')?.value,
      nominativo:this.register?.get('nominativo')?.value,
      username:this.register?.get('username')?.value,
      password:this.register?.get('password')?.value,
      email:this.register?.get('email')?.value
    }

    this.subs.sink=this.authService.editProfile(this.editProfile).subscribe({
      next:res=>{
        if(res){
          Swal.fire({
            icon: 'success',
            title: 'Operazione Effettuata!',
            text: 'Dati anagrafici cambiati con successo!',
            footer: '',
          });

        }
      },
      error:()=>{

      }
    })
  }
}
