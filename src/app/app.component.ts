import { Component, OnInit } from '@angular/core';
import { VendorApiService } from './shared/services/vendor-api.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLandingPage: boolean = false;

  constructor(private vendorApi: VendorApiService,
    private router: Router) { }

  ngOnInit() {
    this.vendorApi.getData().subscribe(
      data => {
        console.log('Data received: ', data)
      },
      error => {
        console.log('Error: ', error)
      }
    );
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.isLandingPage = e.url === '/' || e.url === '/landing-page';
      }
    })
  }

  sendData() {
    const payload = { key: 'value' };
    this.vendorApi.postData(payload).subscribe(
      response => {
        console.log('Response: ', response);
      },
      error => {
        console.log('Error: ', error)
      }
    );
  }
}
