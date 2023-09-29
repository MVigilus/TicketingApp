import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {HomeService} from "../../core/services/dashboard/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit{

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private homeservice: HomeService

  ) {
    super();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.subs.sink =  this.homeservice
      .getAll()
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res)
          }
        },
        error: (error) => {
          console.log(error)
        },
      });
    }

    logout(){
      this.authService.logout().subscribe((res) => {
        if (!res.success) {
          this.router.navigate(['/authentication/signin']);
        }
      });
    }


}
