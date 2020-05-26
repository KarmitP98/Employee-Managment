import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TimeSheet } from "../../shared/model/time-sheet";
import { NgForm } from "@angular/forms";
import { DataStorageService } from "../../shared/data-storage.service";
import { MatTableDataSource } from "@angular/material";
import { loadTrigger } from "../../shared/shared";
import { Employee } from "../../shared/model/employee.model";
import { MONTHS } from "../annual-leave/annual-leave.component";

@Component( {
              selector: "app-time-sheet",
              templateUrl: "./time-sheet.component.html",
              styleUrls: [ "./time-sheet.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeSheetComponent implements OnInit, OnDestroy {

  empSubject: Subscription;
  empSub: Subscription;
  timeSheets: TimeSheet[] = [];
  @ViewChild( "timeForm", { static: false } ) timeForm: NgForm;
  empId: string;
  employee: Employee;

  displayedColumns = [ "userId", "logDate", "work", "startTime", "endTime", "status", "timeSheetId" ];
  dataSource: MatTableDataSource<TimeSheet>;
  options = [ "ACE 101", "CFF 102", "CFF 209", "ZAS 392", "TTP 119", "DTF 476" ];
  today = new Date();
  stTime: string = this.today.getHours() + ":" + (this.today.getMinutes() < 10 ? "0" + this.today.getMinutes() : this.today.getMinutes());
  hours: number;
  work: string;


  constructor( private dataStorageService: DataStorageService ) { }

  ngOnInit() {

    this.empSubject = this.dataStorageService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.empId = value.empId;
        this.empSub = this.dataStorageService.fetchEmployees( "empId", this.empId ).subscribe( value => {
          if ( value ) {
            this.employee = value[0];
            this.dataSource = new MatTableDataSource<TimeSheet>( this.employee.TimeSheets );
          }
        } );
      }
    } );



  }

  ngOnDestroy(): void {
    this.empSubject.unsubscribe();
    this.empSub.unsubscribe();
  }

  onSubmit(): void {
    const date = this.timeForm.value.date;
    const tempSheet: TimeSheet = new TimeSheet( this.empId, "placeholder",
                                                MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                                                this.stTime, this.timeForm.value.work, "Pending", false, this.hours );
    this.dataStorageService.addTimeSheet( tempSheet );
    // this.timeSheets.push( tempSheet );
    this.timeForm.resetForm();
  }

  loadValues(): void {
    this.dataSource = new MatTableDataSource( this.timeSheets );
  }

}
