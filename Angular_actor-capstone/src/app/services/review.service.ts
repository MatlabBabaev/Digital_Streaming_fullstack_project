import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../common/review';
import { AuthComponent } from '../components/auth/auth.component';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private options = {};

  private baseUrl = 'http://localhost:8765/movies-ms/reviews';

  constructor(private httpClient: HttpClient, private auth: AuthComponent) {}

  getReviewList(movieId: number): Observable<Review[]> {
    const bearerToken = `Bearer ${this.auth.getToken()}`;
    this.options = {
      headers: new HttpHeaders({ Authorization: bearerToken }),
    };

    return this.httpClient.get<Review[]>(
      `${this.baseUrl}/${movieId}`,
      this.options
    );
  }

  createReview(review: Review) {
    alert('Your review sent! Thank you for your feedback.');
    return this.httpClient.post(this.baseUrl, review, this.options);
  }
}
