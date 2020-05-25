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
import { TimeReqComponent } from "./pages/time-req/time-req.component";
import { LeaveReqComponent } from "./pages/leave-req/leave-req.component";
import { AdminReqComponent } from "./pages/admin-req/admin-req.component";
import { DatabaseComponent } from "./pages/database/database.component";
import { LoginComponent } from "./pages/login/login.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

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
               DatabaseComponent

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
               AngularFireDatabaseModule
             ],
             providers: [],
             bootstrap: [ AppComponent ]
           } )
export class AppModule {}
