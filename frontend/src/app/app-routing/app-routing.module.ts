import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { TimeSheetComponent } from "../pages/time-sheet/time-sheet.component";
import { AnnualLeaveComponent } from "../pages/annual-leave/annual-leave.component";
import { AdminComponent } from "../pages/admin/admin.component";
import { TimeReqComponent } from "../pages/time-req/time-req.component";
import { AdminReqComponent } from "../pages/admin-req/admin-req.component";
import { LeaveReqComponent } from "../pages/leave-req/leave-req.component";
import { AuthGuard } from "../auth.guard";
import { DatabaseComponent } from "../pages/database/database.component";
import { LoginComponent } from "../pages/login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: "time-sheet", component: TimeSheetComponent, canActivate: [ AuthGuard ] },
  { path: "annual-leave", component: AnnualLeaveComponent, canActivate: [ AuthGuard ] },
  {
    path: "admin", component: AdminComponent, canActivate: [ AuthGuard ], children: [
      { path: "", redirectTo: "time-req", pathMatch: "full" },
      { path: "time-req", component: TimeReqComponent },
      { path: "admin-req", component: AdminReqComponent },
      { path: "leave-req", component: LeaveReqComponent }
    ]
  },
  { path: "database", component: DatabaseComponent, canActivate: [ AuthGuard ] }
];

@NgModule( {
             declarations: [],
             imports: [
               CommonModule, RouterModule.forRoot( routes )
             ],
             exports: [ RouterModule ]
           } )
export class AppRoutingModule {}
