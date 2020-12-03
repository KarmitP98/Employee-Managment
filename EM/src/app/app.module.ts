import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./routes/app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ThemeChangerComponent } from "./components/theme-changer/theme-changer.component";
import { ToolbarComponent } from "./components/dashboard/toolbar/toolbar.component";
import { HomeComponent } from "./components/dashboard/home/home.component";
import { TimeSheetComponent } from "./components/dashboard/time-sheet/time-sheet.component";
import { ProfileComponent } from "./components/dashboard/profile/profile.component";
import { EditProfileComponent } from "./components/dashboard/profile/edit-profile/edit-profile.component";
import { LeaveReqComponent } from "./components/dashboard/admin/leave-req/leave-req.component";
import { TimeReqComponent } from "./components/dashboard/admin/time-req/time-req.component";
import { UsersComponent } from "./components/dashboard/admin/users/users.component";
import { AngularFireModule } from "@angular/fire";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AdminComponent } from "./components/dashboard/admin/admin.component";
import { AnnualLeaveComponent } from "./components/dashboard/annual-leave/annual-leave.component";
import { environment } from "../environments/environment.prod";
import { RecaptchaModule } from "angular-google-recaptcha";
import { HttpClientModule } from "@angular/common/http";
import { LeaveTableComponent } from "./components/dashboard/admin/leave-req/leave-table/leave-table.component";
import { AngularMaterialModule } from "./modules/angular-material/angular-material.module";
import { LogsComponent } from './components/logs/logs.component';
import { MatListModule } from "@angular/material/list";

@NgModule( {
             declarations: [
               AppComponent,
               DashboardComponent,
               LoginComponent,
               SignUpComponent,
               ThemeChangerComponent,
               ToolbarComponent,
               HomeComponent,
               TimeSheetComponent,
               ProfileComponent,
               EditProfileComponent,
               LeaveReqComponent,
               TimeReqComponent,
               UsersComponent,
               AdminComponent,
               AnnualLeaveComponent,
               LeaveTableComponent,
               LogsComponent
             ],
               imports: [
                   BrowserModule,
                   AppRoutingModule,
                   BrowserAnimationsModule,
                   HttpClientModule,
                   AngularFireModule.initializeApp( environment.firebase ),
                   RecaptchaModule.forRoot( { siteKey: "6LezHN8ZAAAAAJAlbO7gddSj9oFg7Mi_wqYZocQS" } ),
                   AngularMaterialModule,
                   MatListModule
               ],
             providers: [ MatDatepickerModule ],
             bootstrap: [ AppComponent ],
             exports: []
           } )
export class AppModule {}
