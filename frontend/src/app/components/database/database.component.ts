import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Employee } from "../../model/employee.model";
import { Leave } from "../../model/leaves.model";
import { LeaveService } from "../../services/leave.service";
import { WorklogService } from "../../services/worklog.service";
import { loadTrigger } from "../../shared/animations";
import { UserService } from "../../services/user.service";
import { Timesheet } from "../../model/timesheet.model";

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

  constructor( private employeeService: UserService, private leaveService: LeaveService, private timeSheetService: WorklogService ) { }

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

    this.timeSheetService.fetchWorkLog().subscribe( value => {
      if ( value ) {
        this.timeDataSource = new MatTableDataSource<Timesheet>( value );
      }
    } );
  }

}
