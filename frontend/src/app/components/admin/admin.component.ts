import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../shared/animations";
import { ADMIN_STATUS, UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { LeaveService } from "../../services/leave.service";
import { WorklogService } from "../../services/worklog.service";

@Component( {
              selector: "app-admin",
              templateUrl: "./admin.component.html",
              styleUrls: [ "./admin.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AdminComponent implements OnInit, OnDestroy {


  leaveSub: Subscription;
  sheetSub: Subscription;
  empSub: Subscription;
  sheetReq = 0;
  adminReq = 0;
  leaveReq = 0;

  constructor( private employeeService: UserService, private leaveService: LeaveService, private timeSheetService: WorklogService ) { }

  ngOnInit() {
    this.sheetSub = this.timeSheetService.fetchWorkLog( "status", ADMIN_STATUS.pending ).subscribe( value1 => {
      if ( value1 ) {
        this.sheetReq = value1.length;
      } else {
        this.sheetReq = 0;
      }
    } );

    this.leaveSub = this.leaveService.fetchLeaves( "status", ADMIN_STATUS.pending ).subscribe( value1 => {
      if ( value1 ) {
        this.leaveReq = value1.length;
      } else {
        this.leaveReq = 0;
      }
    } );

    this.empSub = this.employeeService.fetchEmployees( "adminStatus", ADMIN_STATUS.pending ).subscribe( value1 => {
      if ( value1 ) {
        this.adminReq = value1.length;
      } else {
        this.adminReq = 0;
      }
    } );
  }

  ngOnDestroy(): void {
    this.sheetSub.unsubscribe();
    this.leaveSub.unsubscribe();
    this.empSub.unsubscribe();
  }

}
