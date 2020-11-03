import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/dashboard/home/home.component";
import { AuthGuard } from "../guards/auth.guard";
import { LoginComponent } from "../components/login/login.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { LoginGuard } from "../guards/login.guard";
import { AdminComponent } from "../components/dashboard/admin/admin.component";
import { LeaveReqComponent } from "../components/dashboard/admin/leave-req/leave-req.component";
import { TimeReqComponent } from "../components/dashboard/admin/time-req/time-req.component";
import { AnnualLeaveComponent } from "../components/dashboard/annual-leave/annual-leave.component";
import { TimeSheetComponent } from "../components/dashboard/time-sheet/time-sheet.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: "signUp", component: SignUpComponent, canActivate: [ LoginGuard ] },
  {
    path: ":id", component: DashboardComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ],
    children: [ { path: "home", component: HomeComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ] },
      { path: "time-sheet", component: TimeSheetComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ] },
      { path: "annual-leave", component: AnnualLeaveComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ] },
      {
        path: "admin", component: AdminComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ], children: [
          { path: "", redirectTo: "time-req", pathMatch: "full" },
          { path: "time-req", component: TimeReqComponent },
          { path: "leave-req", component: LeaveReqComponent }
        ]
      } ]
  }
  ,
  { path: "**", redirectTo: "" }
];

@NgModule( {
             declarations: [],
             imports: [
               CommonModule, RouterModule.forRoot( routes )
             ],
             exports: [ RouterModule ]
           } )
export class AppRoutingModule {}
