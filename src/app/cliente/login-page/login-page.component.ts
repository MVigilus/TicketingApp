import {Component, OnInit} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HomeService} from "@core/services/dashboard/home.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  logoUrl!: SafeUrl;
  idImg:any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private homeservice:HomeService,
    private sanitizer: DomSanitizer,
  ) {
    super();
    this.idImg=this.route.snapshot.paramMap.get("id")
    if(this.idImg==null){

    }else{
      this.subs.sink=this.homeservice.getLogoCliente(this.idImg).subscribe({
        next:(data) => {
          const blob = new Blob([data], { type: 'image/png' });
          this.logoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        },
        error:()=>{

        }
      });
    }

    localStorage.clear();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService
        .loginCliente(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (res) => {
            if (res) {
              if (res) {
                const token = this.authService.currentUserValue.token;
                if (token) {
                  this.router.navigate(['/monitoring/dashboard']);
                }
              } else {
                this.error = 'Invalid Login';
              }
            } else {
              this.error = 'Invalid Login';
            }
          },
          error: (error) => {
            console.log(error);
            this.error = error;
            this.submitted = false;
            this.loading = false;
          },
        });
    }
  }
}
