import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataStorageService } from "../../shared/data-storage.service";
import { Subscription } from "rxjs";
import { Leave } from "../../shared/model/leaves.model";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { loadTrigger } from "../../shared/shared";
import { Employee } from "../../shared/model/employee.model";

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

  empSubject: Subscription;
  empSub: Subscription;
  leaves: Leave[] = [];
  empId: string;
  employee: Employee;
  @ViewChild( "leaveForm", { static: false } ) leaveForm: NgForm;

  displayedColumns = [ "empId", "startDate", "endDate", "reason", "status", "leaveId" ];
  dataSource: MatTableDataSource<Leave>;
  stDate = new Date();
  edDate = new Date();
  reason: string = "Sick Leave";

  constructor( private dataStorageService: DataStorageService ) { }

  ngOnInit() {

    this.empSubject = this.dataStorageService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.empId = value.empId;
        this.leaves = Object.values( value.Leaves );
        this.loadValues();
        // this.empSub = this.dataStorageService.fetchEmployees( "empId", this.empId ).subscribe( value1 => {
        //   this.employee = value1[0];
        //   this.leaves = Object.values( value1[0].Leaves );
        //   this.loadValues();
        // } );
      }
    } );


  }

  ngOnDestroy(): void {
    this.empSubject.unsubscribe();
    // this.empSub.unsubscribe();
  }

  onSubmit(): void {
    const tempLeave =
      new Leave( this.empId, "placeholder",
                 MONTHS[this.stDate.getMonth()] + " " + this.stDate.getDate() + ", " + this.stDate.getFullYear(),
                 MONTHS[this.edDate.getMonth()] + " " + this.edDate.getDate() + ", " + this.edDate.getFullYear(), this.reason,
                 "Pending", false );
    console.log( tempLeave );
    this.dataStorageService.addLeave( tempLeave );
    this.loadValues();
    this.leaveForm.reset();
  }

  loadValues(): void {
    this.dataSource = new MatTableDataSource<Leave>( this.leaves );
  }

}
