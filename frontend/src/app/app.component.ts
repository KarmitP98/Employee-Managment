import { Component, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "./services/theme.service";
import { LogService } from "./services/log.service";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ]
            } )
export class AppComponent implements OnInit, OnDestroy {

  constructor( public themeService: ThemeService,
               public logService: LogService ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.logService.log( "Logged Out: " + Timestamp.now().toDate() );
  }

  doBeforeUnload(): void {
  }
}
