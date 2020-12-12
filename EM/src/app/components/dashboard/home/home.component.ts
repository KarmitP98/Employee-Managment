import { Component, OnDestroy, OnInit } from "@angular/core";
import { leftSlideTrigger, loadTrigger } from "../../../shared/animations";
import { UserService } from "../../../services/user.service";
import { WorklogService } from "../../../services/worklog.service";
import { LeaveService } from "../../../services/leave.service";
import { MatDialog } from "@angular/material/dialog";
import { LoggerService } from "../../../services/logger.service";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
              selector: "app-home",
              templateUrl: "./home.component.html",
              styleUrls: [ "./home.component.css" ],
              animations: [ loadTrigger, leftSlideTrigger ]
            } )
export class HomeComponent implements OnInit, OnDestroy {

  dataSource = {
    chart: {
      lowerLimit: "0",
      upperLimit: "40",
      showValue: "1",
      numberSuffix: " Hrs",
      theme: "fusion",
      showToolTip: "1"
    },
    colorRange: {
      color: [ {
        minValue: "0",
        maxValue: "20",
        code: "#f2726f"
      }, {
        minValue: "20",
        maxValue: "30",
        code: "#ffc533"
      }, {
        minValue: "30",
        maxValue: "40",
        code: "#62b58f"
      } ]
    },
    dials: {
      dial: [ {
        value: 0
      } ]
    }
  };

  constructor( private userService: UserService,
               private timeSheetService: WorklogService,
               private leaveService: LeaveService,
               private dialog: MatDialog,
               private loggerService: LoggerService ) { }

  ngOnInit() {
    this.loggerService.log( { data: "Home Page loaded!", time: Timestamp.now() } );
    // this.userService.pageLoaded();
  }

  ngOnDestroy(): void {

  }

  openDetails(): void {
    // this.dialog.open( EmployeeDetailComponent, { data: this.employee } );
  }

}
