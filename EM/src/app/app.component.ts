import { Component, OnInit } from "@angular/core";
import { ThemeService } from "./services/theme.service";
import { LoggerService } from "./services/logger.service";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.scss" ]
            } )
export class AppComponent implements OnInit {

  constructor( public themeService: ThemeService,
               private loggerService: LoggerService ) {
  }


  ngOnInit(): void {
    this.loggerService.log( { data: "Application started.", time: Timestamp.now() } );
  }
}
