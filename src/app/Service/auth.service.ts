import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Login, LoginResponse, Register} from '../Model/auth';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserResponse} from "../Model/user";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_API: string = environment.AUTH_API;
  private USER_API: string = environment.USER_API;
  private isUserLoggedIn: boolean = false;
  private token: any = localStorage.getItem('access_token')?.toString() || null;
  private jwt: JwtHelperService

  /**
   * Dependency Injections
   * @param http
   * @param route
   */
  constructor(private http: HttpClient, private route: Router) {

    this.jwt = new JwtHelperService();
  }

  /**
   * Send user credentials to Auth API for create JWT token
   * @param data
   */
  login(data: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.AUTH_API}/CreateToken`, data);
  }

  /**
   * Send HTTP request to register new user
   * @param data
   */
  register(data: Register): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.USER_API}`, data);
  }

  /**
   * Remove JWT token from localstorage to logout
   */
  logout(): void {
    localStorage.removeItem('access_token');
    if (this.getUserToken() == null) this.route.navigate(['login']);
  }

  /**
   * get user JWT token from localstorage
   * return token as string or null
   */
  getUserToken(): string {
    if (localStorage.getItem('access_token') != null) {
      this.token = localStorage.getItem('access_token')?.toString() || null;
    } else {
      this.token = null;
    }
    return this.token;
  }

  /**
   * check whether user is logged in or not
   * returns true / false
   */
  get isLoggedIn(): boolean {
    if (!this.isUserLoggedIn) {
      if (
        localStorage.getItem('access_token') != null &&
        !this.jwt.isTokenExpired(this.token)
      ) {
        this.isLoggedIn = true;
      }
    }
    return this.isUserLoggedIn;
  }

  set isLoggedIn(value) {
    this.isUserLoggedIn = value;
  }
}
