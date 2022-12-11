import {TestBed} from '@angular/core/testing';
import {UserService} from "./user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../Model/user";
import {RouterTestingModule} from "@angular/router/testing";


describe('UserService', () => {
  let service: UserService, httpTest: HttpTestingController;
  let url = 'https://localhost:44323/api/Users'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [UserService]
    });

    service = TestBed.get(UserService)
    httpTest = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should ', function () {
    const user: User = {
      name: "Ramkumar",
      id: 1,
      username: "ramkuma",
      city: "Thoothukudi",
      about: "Full Stack Developer",
      emailAddress: "ramkumarmani2000@gmail.com"
    }

    service.getMe().subscribe({
      next: res => {
        expect(user).toEqual(res)
      }
    })

    const req = httpTest.expectOne(url + "/GetMe")

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json")

    req.flush(user)

  });
});
