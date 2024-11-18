import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  activeLink: string = '';
  isMenuRequired: boolean = false;

  constructor(private router: Router) { }

  setActiveLink(link: string) {
      this.activeLink = link;
  }

  ngDoCheck(): void{
    let currentUrl = this.router.url;
    if(currentUrl == '/login' || currentUrl == '/register'){
      this.isMenuRequired = false;
    }else{
      this.isMenuRequired = true;
    }
  }
}
