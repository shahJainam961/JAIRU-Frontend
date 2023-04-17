import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {MatTableDataSource} from "@angular/material/table";

export interface userDetails {
  id:number,
  name:string,
  email:string,
  businessTitle:string
}
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  newEmployeeData = {
    username:'',
    password:'',
    name:'',
    phone:'',
    businessTitle:''
  }


  newManagerData = {
    username:'',
    password:'',
    name:'',
    phone:'',
    businessTitle:''
  }


  employeeData:userDetails[] = [];

  managerData:userDetails[]= [];
  employeeDisplayedColumns: string[] = ['id', 'name','email', 'businessTitle',"delete"];
  employeeDataSource:any;

  managerDisplayedColumns: string[] =  ['id', 'name','email', 'businessTitle',"delete"];
  managerDataSource:any;

  addMember = new FormControl();
  assignEmployee = new FormControl();

  displayManager:any;

  constructor(private adminService:AdminService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.employeeDataSource = new MatTableDataSource<any>();
    this.managerDataSource = new MatTableDataSource<any>();

    this.getManagerData();
    this.getEmployeeData();
    this.displayManager = true;
  }

  initializeNewData(){
    this.newManagerData = {
      username:'',
      password:'',
      name:'',
      phone:'',
      businessTitle:''
    }
    this.newEmployeeData = {
      username:'',
      password:'',
      name:'',
      phone:'',
      businessTitle:''
    }

  }

  getManagerData(){
    this.adminService.getManagerData().subscribe(
      (response:any) => {
        this.managerData = [];
        response.forEach(
          (element:any) => {
            let managerDetails = {
              id:element.userId,
              name:element.name,
              email:element.email,
              businessTitle:element.businessTitle
            }
            this.managerData.push(managerDetails);
          }
        )

        this.managerDataSource.data = this.managerData;
        console.log(response);
      },
      (error:any) => {
        this._snackBar.open("Something went wrong !!", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      }
    )
  }


  getEmployeeData(){
    this.adminService.getEmployeeData().subscribe(
      (response:any) => {
        console.log(response)
        this.employeeData = [];
        response.forEach(
          (element:any) => {
            let employeeDetails = {
              id:element.userId,
              name:element.name,
              email:element.email,
              businessTitle:element.businessTitle
            }
            this.employeeData.push(employeeDetails);
          }
        )
        this.employeeDataSource.data = this.employeeData;
        console.log(response);
      },
      (error:any) => {
        this._snackBar.open("Something went wrong !!", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      }
    )
  }

  displayManagerData() {
    this.displayManager = true;
    this.managerDataSource.data = this.managerData;
  }

  displayEmployeeData(){
    this.displayManager = false;
    this.employeeDataSource.data = this.employeeData;
  }

  check(newData:any){

    if(newData.username=='' || newData.password=='' || newData.name=='' || newData.phone=='' || newData.businessTitle==''){
      return false;
    }
    else return true;
  }

  addUser(type:any)
  {

    let email = '';
    let userData = {};
    if(type==0)
    {
      if(!this.check(this.newManagerData)){
        this._snackBar.open("Fill Data Properly", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
        this.initializeNewData();
        return;
      }
      email = this.newManagerData.username + "@manager.org";
      userData = {
        username:this.newManagerData.username,
        email:email,
        password:this.newManagerData.password,
        name:this.newManagerData.name,
        phone:this.newManagerData.phone,
        businessTitle:this.newManagerData.businessTitle
      }
    }
    else{
      if(!this.check(this.newEmployeeData)){
        this._snackBar.open("Fill Data Properly", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
        this.initializeNewData();
        return;
      }
      email = this.newEmployeeData.username + "@employee.org";
      userData = {
        username:this.newEmployeeData.username,
        email:email,
        password:this.newEmployeeData.password,
        name:this.newEmployeeData.name,
        phone:this.newEmployeeData.phone,
        businessTitle:this.newEmployeeData.businessTitle
      }
    }
    this.adminService.addUser(userData).subscribe(
      (response:any) => {
        console.log(response);
        if(type==0){
          this.getManagerData();
          this._snackBar.open('Manager created Successfully', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2* 1000,
          });
        }
        else{
          this.getEmployeeData();
          this._snackBar.open('Employee created Successfully', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2* 1000,
          });
        }
      },
      (error:any) => {
        this._snackBar.open("Something went wrong !!", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      }
    )
    this.initializeNewData();
  }

  deleteUser(id:any) {
    this.adminService.deleteUser(id).subscribe(
      (response:any) => {
        console.log(response);
        this.getManagerData();
        console.log("function call")
        this.getEmployeeData();
        this._snackBar.open('User Deleted Successfully', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      },
      (error:any) => {
        this._snackBar.open("Something went wrong !!", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      }
    )
  }

}
