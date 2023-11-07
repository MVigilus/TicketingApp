import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "@core/services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class ClienteAuthenticationGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue.readOnly) {
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
