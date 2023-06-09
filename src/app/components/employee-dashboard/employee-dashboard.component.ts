import {Component, OnInit, ViewChild} from '@angular/core';
import {ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent} from 'ng-apexcharts';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {AuthguardService} from "../../services/authguard.service";
import {MatTableDataSource} from "@angular/material/table";
import {EmployeeService} from "../../services/employee.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  projects:any;
  selected:any;
  dashboard:any;

  projectDisplayIdx:any;

  taskData:any[] = []
  newStatus:any[] = [];
  pendingTask:any;
  workingTask:any;
  completedTask:any;

  editTaskDetailsDisabled:any;

  taskDisplayedColumns: string[] = ['id','name','desc','status','update'];
  taskDataSource:any;

  @ViewChild("chart") chart:ChartComponent;
  public chartOptions:any;

  constructor(private _snackBar:MatSnackBar, private loginService:LoginService,private employeeService:EmployeeService,private route:Router,private auth:AuthguardService) { }

  ngOnInit(): void {
    if(this.auth.getToken())
    {
      this.loginService.employeePing().subscribe(
        (response:any)=>{
          console.log("get response of ping")
          this.route.navigateByUrl("/employeeDashboard");
        },
        (error:any) => {
          console.log(error);
          this.route.navigateByUrl("/welcome")
        }
      )
    }

    this.chartOptions = {
      series: [0,0,0],
      chart: {
        width: 500,
        type: "pie"
      },
      labels: ["Pending Task","Workin Task","Completed Task"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]

    };

    this.taskDataSource = new MatTableDataSource<any>();
    this.editTaskDetailsDisabled = true;
    this.projects = [];
    this.selected = "dashboard"
    this.pendingTask = 0;
    this.workingTask = 0;
    this.completedTask = 0;
    this.dashboardDisplay();

    console.log(this.projects)
  }



    getAllProjects()
  {
    this.projects = [];
    this.pendingTask = 0;
    this.workingTask = 0;
    this.completedTask = 0;

    this.employeeService.getAllProjects().subscribe(
      (response:any) => {
        response.forEach((element:any) => {
          let project = {
            id:element.projectId,
            name:element.projectName,
            description:element.description,
          }
          this.projects.push(project);
          this.employeeService.getTaskByProject(project.id).subscribe(
            (response:any)=>{
              response.forEach((task:any) =>{
                console.log(task.statusLu.taskStatusLuId);
                if(task.statusLu.taskStatusLuId==1)
                {
                  this.pendingTask = this.pendingTask + 1;
                }
                else if(task.statusLu.taskStatusLuId==2)
                {
                  this.workingTask = this.workingTask + 1;
                }
                else
                {
                  this.completedTask = this.completedTask + 1;
                }
              });
              this.chartOptions.series = [this.pendingTask,this.workingTask,this.completedTask];
            }
          );

        });
        console.log(this.projects)

      },
      (error:any) => {
        console.log(error);
      }

    );
  }

  dashboardDisplay()
  {
    this.dashboard = true;
    let div: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    div.style.background =  "none";
    div.style.color = "white";
    this.selected = "dashboard";
    let newDiv: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    newDiv.style.background =  "#ebe5f0";
    newDiv.style.color = "black";

    this.getAllProjects();
  }
  projectDisplay(idx:any){
    this.dashboard = false;
    console.log("project selectd" + idx);
    console.log(this.selected);
    this.projectDisplayIdx = idx
    let div: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    div.style.background =  "none";
    div.style.color = "white";
    this.selected = "pro"+idx;
    let newDiv: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    newDiv.style.background =  "#ebe5f0";
    newDiv.style.color = "black";

    this.employeeService.getTaskByProject(this.projects[this.projectDisplayIdx].id).subscribe(
      (response:any) => {
        this.taskData = [];
        this.newStatus = [];
        response.forEach((element:any) =>{
          let taskDetails = {
            id:element.taskId,
            name:element.taskName,
            desc:element.description,
            status:element.statusLu.taskStatusLuId,
          }
          this.taskData.push(taskDetails);
          this.newStatus.push(element.statusLu.taskStatusLuId);
        });
        this.taskDataSource.data = this.taskData;
      },
      (error:any) => {
        console.log(error);
      }
    );


  }

  editTask(projectDisplayIdx:any){
    this.editTaskDetailsDisabled = false;
  }

  saveTask(projectDisplayIdx:any){
    this.editTaskDetailsDisabled = true;
  }

  updateTaskStatus(taskId:any,idx:any)
  {
    this.employeeService.updateTaskStatus(this.projects[this.projectDisplayIdx].id,taskId,this.newStatus[idx]).subscribe(
      (response:any) => {
        this.employeeService.getTaskByProject(this.projects[this.projectDisplayIdx].id).subscribe(
          (response:any) => {
            this.taskData = [];
            this.newStatus = [];
            response.forEach((element:any) =>{
              let taskDetails = {
                id:element.taskId,
                name:element.taskName,
                desc:element.description,
                status:element.statusLu.taskStatusLuId,
              }
              this.taskData.push(taskDetails);
              this.newStatus.push(element.statusLu.taskStatusLuId);
            });
            this.taskDataSource.data = this.taskData;
            this._snackBar.open("Task Status updated", 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2* 1000,
            });
          },
          (error:any) => {
            console.log(error);
            this._snackBar.open(error, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2* 1000,
            });
          }
        );
      },
      (error:any) => {
        console.log(error);
      }

    );
  }
}
