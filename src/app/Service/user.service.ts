import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User, UserResponse} from '../Model/user';
import {AuthService} from './auth.service';

const SCHEMAS_GIVEN_NAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
const SCHEMAS_NAME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private url: string = environment.baseUrlUser;
  private data: any;
  private jwt: JwtHelperService

  constructor(private http: HttpClient, private auth: AuthService) {
    this.jwt = new JwtHelperService();
  }

  /**
   * Getter and setter methods of username
   */
  private _username: string = '';

  public get username(): string {
    this.data = this.jwt.decodeToken(this.auth.getUserToken());
    this.username =
      this.data[SCHEMAS_NAME];
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  /**
   * Getter and setter methods of User ID
   */
  private _id: number = 0;

  public get id(): number {
    this.data = this.jwt.decodeToken(this.auth.getUserToken());
    // console.log(this.data);

    this.id = this.data['Id'];

    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  /**
   * Getter and setter methods of Preferred Username
   */
  private _preferredUserName = '';

  public get preferredUserName() {
    this.data = this.jwt.decodeToken(this.auth.getUserToken());
    console.log(
      this.data[SCHEMAS_GIVEN_NAME]
    );

    this.preferredUserName =
      this.data[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
        ];
    return this._preferredUserName;
  }

  public set preferredUserName(value) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
    this._preferredUserName = value;
  }

  /**
   * Getter and setter method of User data
   */
  private _userData!: User;

  public get userData() {
    return this._userData;
  }

  public set userData(value) {
    this._userData = value;
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.url}/GetMe`);
  }

  updateUserData(data: any): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.url}/update`, data);
  }

  updateUserPassword(data: any): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.url}/update/password`, data);
  }
}
