import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actor } from '../common/actor';
import { Observable } from 'rxjs';
import { Movie } from '../common/movie';
import { Router } from '@angular/router';
import redirectUrl from '../constants/redirect';
import { AuthComponent } from '../components/auth/auth.component';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private tokenUrl = 'http://127.0.0.1:8080/token';
  private baseUrl = 'http://localhost:8765/actors-ms/api/v1/actors';
  private update = 'http://localhost:8090/api/v1/actors';
  private options = {};
  private token = '';

  constructor(private httpClient: HttpClient, private auth: AuthComponent) {
    // const token = sessionStorage.getItem('id_token');
  }

  getActorList(): Observable<Actor[]> {
    console.log('Here is >>> id_tokjen', this.auth.getToken());
    if (!this.auth.getToken() || this.auth.getToken().length < 2) {
      console.log('Token is empty');
      window.location.href = redirectUrl();
    } else {
      console.log('inside service token is not empty');
      let bearerToken = `Bearer ${this.auth.getToken()}`;
      this.options = {
        headers: new HttpHeaders({ Authorization: bearerToken }),
      };
    }

    console.log('get actor with token', this.auth.getToken());
    return this.httpClient.get<Actor[]>(this.baseUrl, this.options);
  }

  getActorById(actorId: number): Observable<Actor> {
    console.log('ACTOR LOADED');

    return this.httpClient.get<Actor>(
      this.baseUrl.concat('/' + actorId),
      this.options
    );
  }

  getMoviesByActorId(actorId: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${this.baseUrl}/moviesbyactor/${actorId}`,
      this.options
    );
  }

  actorUpdate(actor: Actor): Observable<Object> {
    console.log(`ACTOR IS UPDATING!!!  - ${this.baseUrl}`, actor);

    return this.httpClient.put(this.baseUrl, actor, this.options);
  }

  addActor(actor: any) {
    console.log(`ACTOR is being added!!!  - ${this.baseUrl}`, actor);
    return this.httpClient.post(this.baseUrl, actor, this.options);
  }

  deleteActor(id: number) {
    return this.httpClient.delete<Actor>(`${this.baseUrl}/${id}`, this.options);
  }

  getActorsByMovie(id: number): Observable<Actor[]> {
    return this.httpClient.get<Actor[]>(
      `${this.baseUrl}/bymovieid/${id}`,
      this.options
    );
  }
}
