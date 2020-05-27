import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../../shared/employee.service";
import { MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";
import { loadTrigger, MONTHS } from "../../shared/shared";
import { Employee } from "../../shared/model/employee.model";
import { Timesheet } from "../../shared/model/timesheet.model";

@Component( {
              selector: "app-time-sheet",
              templateUrl: "./time-sheet.component.html",
              styleUrls: [ "./time-sheet.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeSheetComponent implements OnInit, OnDestroy {

  timeSheetSub: Subscription;
  empSub: Subscription;
  timeSheets: Timesheet[] = [];
  @ViewChild( "timeForm", { static: false } ) timeForm: NgForm;
  empId: string;
  employee: Employee;
  displayedColumns = [ "logDate", "work", "startTime", "hours", "status", "sheetId" ];
  dataSource = new MatTableDataSource<Timesheet>( this.timeSheets );
  options = [ "ACE 101", "CFF 102", "CFF 209", "ZAS 392", "TTP 119", "DTF 476" ];
  today = new Date();
  stTime: string = (this.today.getHours() < 10 ? "0" + this.today.getHours() : this.today.getHours()) + ":" + (this.today.getMinutes() < 10 ? "0" + this.today.getMinutes() : this.today.getMinutes());
  hours: number;
  work: string;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  pageSize = 5;
  pageIndex = 0;

  myFilter = ( d: Date | null ): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };


  constructor( private timeSheetService: TimeSheetService, private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    // Get empId to fetch TimeSheets of that employee
    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.empId = value.empId;
        this.employee = value;

        // Fetch timesheets of that employee
        this.timeSheetSub = this.timeSheetService.fetchTimeSheets( "empId", this.empId ).subscribe( value => {
          if ( value.length > 0 ) {
            this.timeSheets = value;
            this.loadValues();
          }
        } );
      }
    } );

  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
    this.empSub.unsubscribe();
  }

  onSubmit(): void {
    const date = this.timeForm.value.date;
    const tempSheet: Timesheet = new Timesheet( this.empId, "placeholder",
                                                MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                                                this.stTime, this.timeForm.value.work, "Pending", false, this.hours,
                                                this.employee.empName );
    this.timeSheetService.addTimeSheet( tempSheet );
    this.employee.totalHours += this.hours;
    this.employeeService.updateEmployee( this.employee, this.empId );
    // this.timeForm.resetForm();
  }

  loadValues(): void {
    this.dataSource = new MatTableDataSource( this.timeSheets.filter( ( value, index ) => {
      return (index >= this.pageIndex * this.pageSize && index <= (this.pageIndex * this.pageSize + this.pageSize - 1));
    } ) );
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.loadValues();
  }
}
