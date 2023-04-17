import { Component, OnInit } from '@angular/core';
import { AuthguardService } from 'src/app/services/authguard.service';
import { Router, NavigationEnd  } from '@angular/router';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  constructor(private auth:AuthguardService, private loginService:LoginService, private router:Router) {

   }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.getToken();
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = this.auth.getToken();
  }


}
