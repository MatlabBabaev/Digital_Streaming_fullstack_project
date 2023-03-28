import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private cookie: CookieService
  ) {
    this.getAuthorizationCode();
  }

  ngOnInit(): void {
    this.authService
      .getToken()
      .pipe(take(1))
      .subscribe((tokens) => {
        console.log('here is tokens');
        if ((tokens as any)?.id_token) {
          this.cookie.set('refresh_token', (tokens as any).id_token);
          // sessionStorage.setItem('id_token', (tokens as any).id_token);
          this.cookie.set('access_token', (tokens as any).access_token);
          // this.cookie.set('refresh_token', (tokens as any).refresh_token);

          console.log('Here is >>> id_tokjen', this.cookie.get('id_token'));
          this.router.navigate(['/actors']);
        }
      });
  }

  logout() {
    console.log('token before is', this.cookie.get('id_token'));
    console.log(
      'token before is session storage',
      sessionStorage.getItem('id_token')
    );
    sessionStorage.removeItem('access_token');
    sessionStorage.clear();
    this.cookie.deleteAll();
    this.cookie.delete('JSESSIONID');
    console.log('tokin now is>>>', this.cookie.get('id_token'));
    console.log('tokin now is>>>', sessionStorage.getItem('id_token'));
    this.router.navigate(['/']);
  }
  getToken() {
    return this.cookie.get('access_token');
    // return sessionStorage.getItem('id_token');
  }

  getAuthorizationCode() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params?.['code']) {
        this.authService.code = params['code'];
      }
    });
  }
}
