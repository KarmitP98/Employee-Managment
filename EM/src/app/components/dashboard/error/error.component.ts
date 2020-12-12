import { Component, OnInit } from "@angular/core";
import { LoggerService } from "../../../services/logger.service";
import { ActivatedRoute, Router } from "@angular/router";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
              selector: "app-error",
              templateUrl: "./error.component.html",
              styleUrls: [ "./error.component.scss" ]
            } )
export class ErrorComponent implements OnInit {

  constructor( private loggerService: LoggerService,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit(): void {

    this.loggerService.log( { time: Timestamp.now(), data: "Page does not exist!", error: "Error404" } );

    this.router.navigate( [ "../home" ], { relativeTo: this.route } );

  }

}
