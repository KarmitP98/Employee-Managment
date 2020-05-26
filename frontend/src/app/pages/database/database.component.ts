import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Employee } from "../../shared/model/employee.model";
import { Leave } from "../../shared/model/leaves.model";
import { LeaveService } from "../../shared/leave.service";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { loadTrigger } from "../../shared/shared";
import { EmployeeService } from "../../shared/employee.service";
import { Timesheet } from "../../shared/model/timesheet.model";

@Component( {
              selector: "app-database",
              templateUrl: "./database.component.html",
              styleUrls: [ "./database.component.css" ],
              animations: [ loadTrigger ]
            } )
export class DatabaseComponent implements OnInit {

  empDataSource: MatTableDataSource<Employee>;
  leaveDataSource: MatTableDataSource<Leave>;
  timeDataSource: MatTableDataSource<Timesheet>;
  empDisplay = [ "userId", "abv", "userName", "userEmail", "password", "adminStatus" ];
  timeDisplay = [ "userId", "logDate", "startTime", "endTime", "work", "status" ];
  leaveDisplay = [ "userId", "startDate", "endDate", "reason", "status" ];

  constructor( private employeeService: EmployeeService, private leaveService: LeaveService, private timeSheetService: TimeSheetService ) { }

  ngOnInit() {
    this.employeeService.fetchEmployees().subscribe( value => {
      if ( value ) {
        this.empDataSource = new MatTableDataSource<Employee>( value );
      }
    } );

    this.leaveService.fetchLeaves().subscribe( value => {
      if ( value ) {
        this.leaveDataSource = new MatTableDataSource<Leave>( value );
      }
    } );

    this.timeSheetService.fetchTimeSheets().subscribe( value => {
      if ( value ) {
        this.timeDataSource = new MatTableDataSource<Timesheet>( value );
      }
    } );
  }

}
