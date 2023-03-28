import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../common/movie';
import { AuthComponent } from '../components/auth/auth.component';
import redirectUrl from '../constants/redirect';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private options = {};
  private baseUrl = 'http://localhost:8765/movies-ms/api/v1/movies';

  constructor(private httpClient: HttpClient, private auth: AuthComponent) {}

  getMovieList(): Observable<Movie[]> {
    if (this.auth.getToken().length < 2) {
      window.location.href = redirectUrl();
    } else {
      const bearerToken = `Bearer ${this.auth.getToken()}`;
      this.options = {
        headers: new HttpHeaders({ Authorization: bearerToken }),
      };
    }

    return this.httpClient.get<Movie[]>(this.baseUrl, this.options);
  }
  getMovieById(id: number): Observable<Movie> {
    console.log('Movie is loading, id is: ', id);
    return this.httpClient.get<Movie>(`${this.baseUrl}/${id}`, this.options);
  }

  movieUpdate(movie: Movie): Observable<Object> {
    console.log('Movie service getting: ', movie);
    return this.httpClient.put(this.baseUrl, movie, this.options);
  }

  addMovie(movie: any) {
    console.log(`Movie is added`, movie);
    return this.httpClient.post(this.baseUrl, movie, this.options);
  }
}
