import { Component, OnInit } from '@angular/core';
import { AuthguardService } from 'src/app/services/authguard.service';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  constructor(private auth:AuthguardService,/* todo private loginService:LoginService, */private router:Router) {

   }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.getToken();
  }

  logout(){
    //todo this.loginService.logout();
    this.isLoggedIn = this.auth.getToken();
  }


}
