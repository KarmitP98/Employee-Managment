import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../shared/shared";
import { ADMIN_STATUS, EmployeeService } from "../../services/employee.service";
import { Subscription } from "rxjs";
import { LeaveService } from "../../services/leave.service";
import { TimeSheetService } from "../../services/time-sheet.service";

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

  constructor( private employeeService: EmployeeService, private leaveService: LeaveService, private timeSheetService: TimeSheetService ) { }

  ngOnInit() {
    this.sheetSub = this.timeSheetService.fetchTimeSheets( "status", ADMIN_STATUS.pending ).subscribe( value1 => {
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
