import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import tokenUrl from '../constants/token';
import { HttpService } from './http.service';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public code = '';

  constructor(private httpService: HttpService) {}

  getToken() {
    const userClientId = 'ultimate_digital_labs';
    const userSecret = 'capstone';
    const basicAuth =
      `Basic ` +
      Buffer.from(`${userClientId}:${userSecret}`).toString('base64');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: basicAuth,
    });

    const options = {
      headers: headers,
    };

    return this.httpService.doPost(tokenUrl(this.code), null, options);
  }
}
