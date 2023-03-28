import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Admin } from '../common/admin';
import { AuthComponent } from '../components/auth/auth.component';
import redirectUrl from '../constants/redirect';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private options = {};

  baseUrl: string = 'http://localhost:8765/admin-ms/admins'; //end point
  constructor(private httpClient: HttpClient, private auth: AuthComponent) {
    if (this.auth.getToken().length < 2) {
      window.location.href = redirectUrl();
    }
  }

  registerUser(admin: Admin) {
    return this.httpClient.post(this.baseUrl, admin, this.options);
  }

  //("/users/checkEmail/{email}")
  emailInUse(email: string) {
    console.log('USERS>>>>', this.auth.getToken());
    if (this.auth.getToken().length < 2) {
      window.location.href = redirectUrl();
    } else {
      const bearerToken = `Bearer ${this.auth.getToken()}`;
      this.options = {
        headers: new HttpHeaders({ Authorization: bearerToken }),
      };
    }
    return this.httpClient.get<Boolean>(
      this.baseUrl + '/' + email,
      this.options
    );
  }
}
