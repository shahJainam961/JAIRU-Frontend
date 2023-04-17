import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = environment.apiURL;

  constructor(private router:Router,private http:HttpClient) { }

  addUser(userData:any){
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.post(`${this.url}/users/register`, userData,{'headers':header});
  }

  deleteUser(userId:any){
    let token = localStorage.getItem("SessionUser");
    let params = new HttpParams();
    params = params.append('userId',userId);
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/admin/deleteUser`,{'headers':header,'params':params});
  }

  getManagerData(){

    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/admin/getManagerData`,{'headers':header});
  }

  getEmployeeData(){
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/admin/getEmployeeData`,{'headers':header});
  }

}
