import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import demoUrl from 'src/app/constants/demo';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  public demoContent: string = '';

  ngOnInit(): void {
    console.log('Home comp');
    // this.getDemoInformation();
  }

  private getDemoInformation() {
    console.log('Get demo----');
    const token = sessionStorage.getItem('id_token');
    const bearerToken = `Bearer ${token}`;
    const options = {
      headers: new HttpHeaders({ Authorization: bearerToken }),
    };

    console.log('token is:>>>', token);
    this.httpService
      .GetAct(demoUrl(), options)
      .pipe(take(1))
      .subscribe((data) => {
        console.log('getting content>><<');
        console.log(data);
      });
  }
}
