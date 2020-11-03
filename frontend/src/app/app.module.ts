import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./components/header/header.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { TimeSheetComponent } from "./components/time-sheet/time-sheet.component";
import { AnnualLeaveComponent } from "./components/annual-leave/annual-leave.component";
import { AdminComponent } from "./components/admin/admin.component";
import { TimeReqComponent } from "./components/admin/time-req/time-req.component";
import { LeaveReqComponent } from "./components/admin/leave-req/leave-req.component";
import { AdminReqComponent } from "./components/admin/admin-req/admin-req.component";
import { DatabaseComponent } from "./components/database/database.component";
import { LoginComponent } from "./components/login/login.component";
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
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ChartsModule } from "ng2-charts";
import { EmployeeCardComponent } from "./components/admin/employee-card/employee-card.component";
import { EmployeeDetailComponent } from "./components/admin/employee-card/employee-detail/employee-detail.component";
import { FusionChartsModule } from "angular-fusioncharts";
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Load Widgets
import * as Widgets from "fusioncharts/fusioncharts.widgets";
import { NewsComponent } from "./components/home/news/news.component";
import { VisionComponent } from "./components/home/vision/vision.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { environment } from "../environments/environment.prod";

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot( FusionCharts, charts, FusionTheme, Widgets );

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
               EmployeeDetailComponent,
               NewsComponent,
               VisionComponent
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
               MatDialogModule,
               FusionChartsModule,
               ScrollingModule
             ],
             providers: [],
             bootstrap: [ AppComponent ],
             entryComponents: [ EmployeeDetailComponent ]
           } )
export class AppModule {}
