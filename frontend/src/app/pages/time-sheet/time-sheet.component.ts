import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { TimeSheet } from "../../shared/model/time-sheet";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../../shared/employee.service";
import { MatTableDataSource } from "@angular/material";
import { loadTrigger } from "../../shared/shared";

@Component( {
              selector: "app-time-sheet",
              templateUrl: "./time-sheet.component.html",
              styleUrls: [ "./time-sheet.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeSheetComponent implements OnInit, OnDestroy {

  timeSheetSub: Subscription;
  empSub: Subscription;
  timeSheets: TimeSheet[] = [];
  @ViewChild( "timeForm", { static: false } ) timeForm: NgForm;
  empId: string;
  displayedColumns = [ "userId", "logDate", "work", "startTime", "endTime", "status", "timeSheetId" ];
  dataSource: MatTableDataSource<TimeSheet>;
  options = [ "ACE 101", "CFF 102", "CFF 209", "ZAS 392", "TTP 119", "DTF 476" ];
  today = new Date();
  stTime: string = this.today.getHours() + ":" + (this.today.getMinutes() < 10 ? "0" + this.today.getMinutes() : this.today.getMinutes());
  edTime: string = this.stTime;

  constructor( private timeSheetService: TimeSheetService, private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.empId = value.empId;
      }
    } );

    this.timeSheetSub = this.timeSheetService.fetchTimeSheets( true, this.empId ).subscribe( value => {
      if ( value.length > 0 ) {
        this.timeSheets = value;
        this.loadValues();
      }
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
    this.empSub.unsubscribe();
  }

  onSubmit(): void {
    const date = this.timeForm.value.date;
    const startTime: number = this.timeForm.value.startTime;
    const endTime: number = this.timeForm.value.endTime;
    // const hours = endTime - startTime;
    console.log( startTime );
    console.log( endTime );
    console.log( endTime - startTime );
    // const tempSheet: TimeSheet = new TimeSheet( this.empId, "placeholder",
    //                                             MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
    //                                             startTime, endTime, this.timeForm.value.work, "Pending", false, hours );
    // this.timeSheetService.addTimeSheet( tempSheet );
    // this.timeSheets.push( tempSheet );
    // this.loadValues();
    // this.timeForm.resetForm();
  }

  loadValues(): void {
    this.dataSource = new MatTableDataSource( this.timeSheets );
  }

}
