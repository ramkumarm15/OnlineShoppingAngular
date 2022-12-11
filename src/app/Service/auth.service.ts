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
  private authUrl: string = environment.baseUrlAuth;
  private userUrl: string = environment.baseUrlUser;
  private isUserLoggedIn: boolean = false;
  private token: any = localStorage.getItem('access_token')?.toString() || null;
  private jwt: JwtHelperService
  /**
   * Injecting service
   */
  constructor(private http: HttpClient, private route: Router) {

    this.jwt = new JwtHelperService();
  }

  /**
   * function to login a user
   * return JWT keys and user data
   */
  login(data: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/CreateToken`, data);
  }

  register(data: Register): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.userUrl}`, data);
  }

  // function to logout a user
  // no return
  logout(): void {
    localStorage.removeItem('access_token');
    // console.log(this.getUserToken());
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
        // console.log(this.isLoggedIn);
      }
    }
    return this.isUserLoggedIn;
  }

  set isLoggedIn(value) {
    this.isUserLoggedIn = value;
  }
}
