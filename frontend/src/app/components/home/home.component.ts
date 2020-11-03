import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getWeekNumber, leftSlideTrigger, loadTrigger, STARTYEAR } from "../../shared/animations";
import { ADMIN_STATUS, UserService } from "../../services/user.service";
import { Employee } from "../../model/employee.model";
import { MatDialog } from "@angular/material";
import { EmployeeDetailComponent } from "../admin/employee-card/employee-detail/employee-detail.component";
import { WorklogService } from "../../services/worklog.service";
import { LeaveService } from "../../services/leave.service";

@Component( {
              selector: "app-home",
              templateUrl: "./home.component.html",
              styleUrls: [ "./home.component.css" ],
              animations: [ loadTrigger, leftSlideTrigger ]
            } )
export class HomeComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  employee: Employee;
  private sub: Subscription;
  today = new Date();

  empReq: number = 0;
  timeReq: number = 0;
  leaveReq: number = 0;
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
  stringRequests: string[] = [];
  empSReq: string[] = [];
  timeSReq: string[] = [];
  leaveSReq: string[] = [];
  private empSub: Subscription;
  private timeSub: Subscription;
  private leaveSub: Subscription;

  constructor( private employeeService: UserService,
               private timeSheetService: WorklogService,
               private leaveService: LeaveService,
               private dialog: MatDialog ) { }

  ngOnInit() {
    this.sub = this.employeeService.employeeSubject.subscribe( value => {
      const isAuth = !!value;
      if ( isAuth ) {
        this.isAdmin = value.isAdmin;
        this.employee = value;
        this.dataSource.dials.dial[0].value = value.hoursPerWeek[this.today.getFullYear() - STARTYEAR][getWeekNumber( this.today )];
      } else {
        this.isAdmin = false;
      }
    } );

    this.empSub = this.employeeService.fetchEmployees( "adminStatus", ADMIN_STATUS.pending ).subscribe(
      value => {
        if ( value ) {
          this.empReq = value.length;
          for ( let v of value ) {
            this.empSReq.push( v.empName + ": Admin Request" );
          }
        } else {
          this.empReq = 0;
          this.empSReq = [];
        }
        this.leaveSub = this.leaveService.fetchLeaves( "status", ADMIN_STATUS.pending ).subscribe( value => {
          if ( value ) {
            this.leaveReq = value.length;
            for ( let v of value ) {
              this.leaveSReq.push( v.empName + ": Leave Request!" );
            }
          } else {
            this.leaveReq = 0;
            this.leaveSReq = [];
          }
          this.timeSub = this.timeSheetService.fetchWorkLog( "status", ADMIN_STATUS.pending ).subscribe( value => {
            if ( value ) {
              this.timeReq = value.length;
              for ( let v of value ) {
                this.timeSReq.push( v.empName + ": Time Log Update!" );
              }
            } else {
              this.timeReq = 0;
              this.timeSReq = [];
            }
            this.stringRequests = this.empSReq.concat( this.timeSReq.concat( this.leaveSReq ) );
          } );
        } );
      }
    );

    console.log( new Date() );
    console.log( getWeekNumber( new Date() ) );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.empSub.unsubscribe();
    this.timeSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }

  openDetails(): void {
    this.dialog.open( EmployeeDetailComponent, { data: this.employee } );
  }

}
