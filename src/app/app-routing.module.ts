import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {ManagerLoginComponent} from "./components/manager-login/manager-login.component";
import {EmployeeLoginComponent} from "./components/employee-login/employee-login.component";
import {AdminLoginComponent} from "./components/admin-login/admin-login.component";

const routes: Routes = [
  {
    path:'',
    redirectTo:'welcome',
    pathMatch:'full'
  },
  {
    path:'welcome',
    component:WelcomeComponent,
    pathMatch:'full'
  },
  {
    path:'managerLogin',
    component:ManagerLoginComponent,
    pathMatch:'full'
  },
  {
    path:'employeeLogin',
    component:EmployeeLoginComponent,
    pathMatch:'full'
  },
  {
    path:'adminLogin',
    component:AdminLoginComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
