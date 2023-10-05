import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from 'rxjs/operators';
import {User} from "../model/User";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/${environment.servizi.auth.login}`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
         // console.log(JSON.stringify(user))
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  CheckJwt() {
    return this.http.post<boolean>(`${environment.apiUrl}/${environment.servizi.auth.checkJWT}`, this.currentUserValue.token).pipe(
      map((res) => {
        return res;
      })
    );
    // Use RxJS interval operator to execute the HTTP request every minute

  }
}
