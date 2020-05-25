import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { LeaveService } from "../../shared/leave.service";
import { EmployeeService } from "../../shared/employee.service";
import { Subscription } from "rxjs";
import { Leave } from "../../shared/model/leaves.model";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { loadTrigger } from "../../shared/shared";

export const MONTHS = [ "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December" ];

@Component( {
              selector: "app-annual-leave",
              templateUrl: "./annual-leave.component.html",
              styleUrls: [ "./annual-leave.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AnnualLeaveComponent implements OnInit, OnDestroy {

  leaveSub: Subscription;
  empSub: Subscription;
  leaves: Leave[] = [];
  empId: string;
  @ViewChild( "leaveForm", { static: false } ) leaveForm: NgForm;
  displayedColumns = [ "userId", "startDate", "endDate", "reason", "status", "leaveId" ];
  dataSource: MatTableDataSource<Leave>;
  minDate = new Date();
  date: Date;

  constructor( private leaveService: LeaveService, private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.empId = value.empId;
      }
    } );

    this.leaveSub = this.leaveService.fetchLeaves( true, this.empId ).subscribe( value => {
      if ( value ) {
        this.leaves = value;
        this.loadValues();
      }
    } );
  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }

  onSubmit(): void {
    const startDate = new Date( this.leaveForm.value.startDate );
    const endDate = new Date( this.leaveForm.value.endDate );
    const tempLeave =
      new Leave( this.empId, "placeholder",
                 MONTHS[startDate.getMonth()] + " " + startDate.getDate() + ", " + startDate.getFullYear(),
                 MONTHS[endDate.getMonth()] + " " + endDate.getDate() + ", " + endDate.getFullYear(), this.leaveForm.value.reason,
                 "Pending", false );
    this.leaveService.addLeave( tempLeave );
    this.leaves.push( tempLeave );
    this.loadValues();
    this.leaveForm.resetForm();
  }

  loadValues(): void {
    this.dataSource = new MatTableDataSource<Leave>( this.leaves );
  }

}
