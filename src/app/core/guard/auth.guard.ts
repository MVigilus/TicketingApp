import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue && JSON.stringify(this.authService.currentUserValue)!="{}") {
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
