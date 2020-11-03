import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { TimeSheetComponent } from "../components/time-sheet/time-sheet.component";
import { AnnualLeaveComponent } from "../components/annual-leave/annual-leave.component";
import { AdminComponent } from "../components/admin/admin.component";
import { TimeReqComponent } from "../components/admin/time-req/time-req.component";
import { AdminReqComponent } from "../components/admin/admin-req/admin-req.component";
import { LeaveReqComponent } from "../components/admin/leave-req/leave-req.component";
import { AuthGuard } from "../guards/auth.guard";
import { DatabaseComponent } from "../components/database/database.component";
import { LoginComponent } from "../components/login/login.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { LoginGuard } from "../guards/login.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: "signUp", component: SignUpComponent, canActivate: [ LoginGuard ] },
  { path: "home", component: HomeComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ] },
  { path: "time-sheet", component: TimeSheetComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ] },
  { path: "annual-leave", component: AnnualLeaveComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ] },
  {
    path: "admin", component: AdminComponent, canActivate: [ AuthGuard ], canDeactivate: [ AuthGuard ], children: [
      { path: "", redirectTo: "time-req", pathMatch: "full" },
      { path: "time-req", component: TimeReqComponent },
      { path: "admin-req", component: AdminReqComponent },
      { path: "leave-req", component: LeaveReqComponent }
    ]
  },
  { path: "database", component: DatabaseComponent, canActivate: [ AuthGuard ] },
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
