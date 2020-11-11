import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./components/dashboard/header/header.component";
import { AppRoutingModule } from "./routes/app-routing.module";
import { HomeComponent } from "./components/dashboard/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ChartsModule } from "ng2-charts";
import { FusionChartsModule } from "angular-fusioncharts";
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Load Widgets
import * as Widgets from "fusioncharts/fusioncharts.widgets";
import { NewsComponent } from "./components/dashboard/home/news/news.component";
import { VisionComponent } from "./components/dashboard/home/vision/vision.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { environment } from "../environments/environment.prod";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatBadgeModule } from "@angular/material/badge";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { AdminComponent } from "./components/dashboard/admin/admin.component";
import { LeaveReqComponent } from "./components/dashboard/admin/leave-req/leave-req.component";
import { TimeReqComponent } from "./components/dashboard/admin/time-req/time-req.component";
import { AnnualLeaveComponent } from "./components/dashboard/annual-leave/annual-leave.component";
import { TimeSheetComponent } from "./components/dashboard/time-sheet/time-sheet.component";
import { MatMenuModule } from "@angular/material/menu";
import { IonicModule } from "@ionic/angular";
import { RequestsComponent } from "./components/dashboard/admin/requests/requests.component";

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
               LoadingSpinnerComponent,
               SignUpComponent,
               NewsComponent,
               VisionComponent,
               DashboardComponent,
               TimeSheetComponent,
               RequestsComponent
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
               ScrollingModule,
               MatInputModule,
               MatButtonModule,
               MatGridListModule,
               MatBadgeModule,
               MatToolbarModule,
               MatCardModule,
               MatMenuModule,
               IonicModule.forRoot()
             ],
             providers: [],
             bootstrap: [ AppComponent ],
             entryComponents: []
           } )
export class AppModule {}
