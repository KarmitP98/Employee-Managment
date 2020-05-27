import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./pages/header/header.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { TimeSheetComponent } from "./pages/time-sheet/time-sheet.component";
import { AnnualLeaveComponent } from "./pages/annual-leave/annual-leave.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { TimeReqComponent } from "./pages/admin/time-req/time-req.component";
import { LeaveReqComponent } from "./pages/admin/leave-req/leave-req.component";
import { AdminReqComponent } from "./pages/admin/admin-req/admin-req.component";
import { DatabaseComponent } from "./pages/database/database.component";
import { LoginComponent } from "./pages/login/login.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { ChartsModule } from "ng2-charts";
import { EmployeeCardComponent } from "./pages/admin/employee-card/employee-card.component";
import { EmployeeDetailComponent } from "./pages/admin/employee-card/employee-detail/employee-detail.component";

@NgModule( {
             declarations: [
               AppComponent,
               HeaderComponent,
               LoginComponent,
               HomeComponent,
               TimeSheetComponent,
               AnnualLeaveComponent,
               AdminComponent,
               TimeReqComponent,
               LeaveReqComponent,
               AdminReqComponent,
               LoadingSpinnerComponent,
               DatabaseComponent,
               SignUpComponent,
               EmployeeCardComponent,
               EmployeeDetailComponent
             ],
             imports: [
               BrowserModule,
               FormsModule,
               HttpClientModule,
               AppRoutingModule,
               BrowserAnimationsModule,
               MatInputModule,
               MatSlideToggleModule,
               MatOptionModule,
               MatSelectModule,
               MatButtonModule,
               MatDatepickerModule,
               MatNativeDateModule,
               MatExpansionModule,
               MatTableModule,
               MatSnackBarModule,
               MatToolbarModule,
               MatCheckboxModule,
               MatSortModule,
               MatRadioModule,
               MatCardModule,
               MatAutocompleteModule,
               MatListModule,
               AngularFireModule.initializeApp( environment.firebase ),
               AngularFireDatabaseModule,
               MatBadgeModule,
               MatPaginatorModule,
               ChartsModule,
               MatTabsModule,
               MatGridListModule,
               MatIconModule,
               MatTooltipModule,
               MatDialogModule
             ],
             providers: [],
             bootstrap: [ AppComponent ],
             entryComponents: [ EmployeeDetailComponent ]
           } )
export class AppModule {}
