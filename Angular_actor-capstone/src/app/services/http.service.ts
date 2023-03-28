import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../common/actor';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  doPost(url: string, body: any, options: { headers: HttpHeaders }) {
    return this.httpClient.post(url, body, options);
  }

  doGet(url: string, options: { headers: HttpHeaders }) {
    console.log('inside the do Get method_===', url);
    return this.httpClient.get(url, options);
  }

  GetAct(url: string, options: { headers: HttpHeaders }):Observable<Actor[]> {
    console.log('inside the getActor method_===', url);
    return this.httpClient.get<Actor[]>(url, options);
  }
}
