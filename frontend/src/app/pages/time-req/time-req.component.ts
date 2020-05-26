import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";
import { loadTrigger } from "../../shared/shared";
import { ADMIN_STATUS, EmployeeService } from "../../shared/employee.service";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { Timesheet } from "../../shared/model/timesheet.model";
import { Employee } from "../../shared/model/employee.model";


@Component( {
              selector: "app-time-req",
              templateUrl: "./time-req.component.html",
              styleUrls: [ "./time-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeReqComponent implements OnInit, OnDestroy {

  timeSheets: Timesheet[] = [];
  empSub: Subscription;
  sheetSub: Subscription;
  employee: Employee;
  empId: string;
  displayedColumns: string[] = [ "select", "userId", "logDate", "startTime", "endTime", "work", "status" ];
  selectedReq: Timesheet;
  dataSource = new MatTableDataSource<Timesheet>( this.timeSheets );
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  pageSize = 5;
  pageIndex = 0;

  constructor( private employeeService: EmployeeService, private timeSheetService: TimeSheetService ) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;

    this.empSub = this.employeeService.employeeSubject.subscribe( emp => {
      if ( emp ) {
        this.employee = emp;
        this.empId = emp.empId;

        this.sheetSub = this.timeSheetService.fetchTimeSheets().subscribe( value => {
          this.timeSheets = value;
          this.loadValues();
        } );
      }
    } );
  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.sheetSub.unsubscribe();
  }

  changeStatus( b: boolean ) {
    this.selectedReq.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    console.log( this.selectedReq );
    this.timeSheetService.updateTimeSheet( this.selectedReq, this.selectedReq.sheetId );
    this.selectedReq = null;
  }

  removeReq(): void {
    this.timeSheetService.removeTimeSheet( this.selectedReq );
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<Timesheet>( this.timeSheets.filter( ( value, index ) => {
      return (index >= this.pageIndex * this.pageSize && index <= (this.pageIndex * this.pageSize + this.pageSize - 1));
    } ) );
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.loadValues();
  }
}
