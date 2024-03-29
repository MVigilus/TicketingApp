import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {AuthService} from "@core/services/auth.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) {
    super();
  }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.subs.sink=this.authService.resetPassword(this.f["email"].value).subscribe({
        next: res => {
          if(res){
            Swal.fire('Password Resettata', 'riceverai la nuova password per email', 'success');
          }else {
            Swal.fire({
              icon: 'error',
              title: 'Email non trovata',
              text: 'Assicurati di aver inserito l\'email giusta!',
              footer: '' +
                '',
            });
          }
          this.router.navigate(['/authentication/signin']);
        },
        error: res => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Qualcosa è andato Storto!',
            footer: '' +
              '',
          });
          this.router.navigate(['/authentication/signin']);
        }
      })
    }
  }

}
