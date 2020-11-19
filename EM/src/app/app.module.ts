import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./routes/app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatGridListModule } from "@angular/material/grid-list";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ThemeChangerComponent } from "./components/theme-changer/theme-changer.component";
import { ToolbarComponent } from "./components/dashboard/toolbar/toolbar.component";
import { HomeComponent } from "./components/dashboard/home/home.component";
import { LeavesComponent } from "./components/dashboard/leaves/leaves.component";
import { TimeSheetComponent } from "./components/dashboard/time-sheet/time-sheet.component";
import { ProfileComponent } from "./components/dashboard/profile/profile.component";
import { EditProfileComponent } from "./components/dashboard/profile/edit-profile/edit-profile.component";
import { LeaveReqComponent } from "./components/dashboard/admin/leave-req/leave-req.component";
import { TimeReqComponent } from "./components/dashboard/admin/time-req/time-req.component";
import { UsersComponent } from "./components/dashboard/admin/users/users.component";
import { AngularFireModule } from "@angular/fire";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { AdminComponent } from "./components/dashboard/admin/admin.component";
import { AnnualLeaveComponent } from "./components/dashboard/annual-leave/annual-leave.component";
import { environment } from "../environments/environment.prod";
import { RecaptchaModule } from "angular-google-recaptcha";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { IonicModule } from "@ionic/angular";

@NgModule( {
             declarations: [
               AppComponent,
               DashboardComponent,
               LoginComponent,
               SignUpComponent,
               ThemeChangerComponent,
               ToolbarComponent,
               HomeComponent,
               LeavesComponent,
               TimeSheetComponent,
               ProfileComponent,
               EditProfileComponent,
               LeaveReqComponent,
               TimeReqComponent,
               UsersComponent,
               AdminComponent,
               AnnualLeaveComponent
             ],
             imports: [
               BrowserModule,
               AppRoutingModule,
               BrowserAnimationsModule,
               HttpClientModule,
               MatGridListModule,
               AngularFireModule.initializeApp( environment.firebase ),
               MatProgressSpinnerModule,
               MatMenuModule,
               MatIconModule,
               MatButtonModule,
               FormsModule,
               MatToolbarModule,
               MatFormFieldModule,
               MatSelectModule,
               MatDatepickerModule,
               MatSlideToggleModule,
               MatInputModule,
               MatSnackBarModule,
               IonicModule.forRoot(),
               RecaptchaModule
                 .forRoot( {
                             siteKey: "6LezHN8ZAAAAAJAlbO7gddSj9oFg7Mi_wqYZocQS"
                           } ),
               MatCardModule
             ],
             providers: [],
             bootstrap: [ AppComponent ],
             exports: []
           } )
export class AppModule {}
