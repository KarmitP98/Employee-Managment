import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Employee } from "../../shared/model/employee.model";
import { ADMIN_STATUS, EmployeeService } from "../../shared/employee.service";
import { LeaveService } from "../../shared/leave.service";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { COMPANY_NAME } from "../../shared/shared";

@Component( {
              selector: "app-header",
              templateUrl: "./header.component.html",
              styleUrls: [ "./header.component.css" ]
            } )
export class HeaderComponent implements OnInit, OnDestroy {

  public isAdmin: boolean = false;
  isAuth: boolean = false;
  private userSub: Subscription;
  leaveSub: Subscription;
  sheetSub: Subscription;
  empSub: Subscription;
  private emp: Employee;
  sheetReq = 0;
  adminReq = 0;
  leaveReq = 0;
  companyName = COMPANY_NAME;

  constructor( public employeeService: EmployeeService, private leaveService: LeaveService, private timeSheetService: TimeSheetService ) { }

  ngOnInit() {
    this.userSub = this.employeeService.employeeSubject.subscribe( ( value: Employee ) => {
      this.isAuth = !!value;
      if ( this.isAuth ) {
        this.emp = value;
        this.isAdmin = this.emp.isAdmin;

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
    } );
  }

  onLogout(): void {
    this.employeeService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.sheetSub.unsubscribe();
    this.leaveSub.unsubscribe();
    this.empSub.unsubscribe();
  }
}
