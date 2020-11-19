import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/dashboard/home/home.component";
import { AuthGuard } from "../guards/auth.guard";
import { LoginComponent } from "../components/login/login.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { LoginGuard } from "../guards/login.guard";
import { LeaveReqComponent } from "../components/dashboard/admin/leave-req/leave-req.component";
import { TimeReqComponent } from "../components/dashboard/admin/time-req/time-req.component";
import { TimeSheetComponent } from "../components/dashboard/time-sheet/time-sheet.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { UsersComponent } from "../components/dashboard/admin/users/users.component";
import { AdminComponent } from "../components/dashboard/admin/admin.component";
import { AnnualLeaveComponent } from "../components/dashboard/annual-leave/annual-leave.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: "signUp", component: SignUpComponent, canActivate: [ LoginGuard ] },
  {
    path: ":uId", component: DashboardComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent, canActivate: [ AuthGuard ] },
      { path: "worklog", component: TimeSheetComponent, canActivate: [ AuthGuard ] },
      { path: "leave", component: AnnualLeaveComponent, canActivate: [ AuthGuard ] },
      {
        path: "admin", component: AdminComponent, canActivate: [ AuthGuard ],
        children: [
          { path: "", redirectTo: "leave-req", pathMatch: "full" },
          { path: "time-req", component: TimeReqComponent },
          { path: "leave-req", component: LeaveReqComponent },
          { path: "users", component: UsersComponent }
        ]
      } ]
  }
  ,
  { path: "**", redirectTo: "" }
];

@NgModule( {
             imports: [ RouterModule.forRoot( routes ) ],
             exports: [ RouterModule ]
           } )
export class AppRoutingModule {}
