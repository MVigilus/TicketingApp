import {Injectable} from "@angular/core";
import {AuthService} from "@core/services/auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue.admin) {
      return true;
    }
    this.router.navigate(['/dashboard/HomePage']);
    return false;
  }
}
