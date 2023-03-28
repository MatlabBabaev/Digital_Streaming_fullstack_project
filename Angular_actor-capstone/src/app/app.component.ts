import { Component } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-capstone';
  public filteredStatus ='';

  constructor(private auth: AuthComponent) {}

  logout() {
    this.auth.logout();
    document.querySelector('.total').textContent = 'Logout';
    // window.location.reload();
  }
}
