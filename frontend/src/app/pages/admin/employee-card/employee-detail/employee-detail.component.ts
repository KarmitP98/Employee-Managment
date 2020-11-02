import { Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";
import { Employee } from "../../../../model/employee.model";
import { TimeSheetService } from "../../../../services/time-sheet.service";
import { Timesheet } from "../../../../model/timesheet.model";
import { Subscription } from "rxjs";
import { Leave } from "../../../../model/leaves.model";
import { LeaveService } from "../../../../services/leave.service";

@Component( {
              selector: "app-employee-detail",
              templateUrl: "./employee-detail.component.html",
              styleUrls: [ "./employee-detail.component.css" ]
            } )
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  timeSheets: Timesheet[] = [];
  leaves: Leave[] = [];
  sheetSub: Subscription;
  leaveSub: Subscription;

  sheetData = new MatTableDataSource<Timesheet>( this.timeSheets );
  leaveData = new MatTableDataSource<Leave>( this.leaves );

  @ViewChild( MatPaginator, { static: true } ) timePaginator: MatPaginator;
  @ViewChild( MatPaginator, { static: true } ) leavePaginator: MatPaginator;

  sheetIndex = 0;
  sheetSize = 3;

  leaveIndex = 0;
  leaveSize = 3;

  dataSource = {
    chart: {
      caption: "Time-sheet Log",
      xAxisName: "Dates",
      yAxisName: "Hours (hh)",
      numberSuffix: " Hrs",
      numvisibleplot: "3",
      theme: "fusion"
    },
    data: []
  };

  selectedTimeSheet: Timesheet;
  selectedLeave: Leave;
  timeColumns = [ "logDate", "work", "startTime", "hours", "status" ];
  leaveColumns = [ "startDate", "endDate", "reason", "status" ];
  pageSizeOptions = [ 1, 2, 3 ];

  constructor( @Inject(
    MAT_DIALOG_DATA ) public emp: Employee, private timeSheetService: TimeSheetService, private leaveService: LeaveService ) { }

  ngOnInit() {

    this.sheetData.paginator = this.timePaginator;
    this.leaveData.paginator = this.leavePaginator;

    this.sheetSub = this.timeSheetService.fetchTimeSheets( "empId", this.emp.empId ).subscribe( value => {
      if ( value ) {
        this.timeSheets = value;
        this.dataSource.data = [];
        for ( const v of value ) {
          this.dataSource.data.push( { value: v.hours + "", label: v.logDate } );
        }
        this.loadTimeSheet();
      }
    } );

    this.leaveSub = this.leaveService.fetchLeaves( "empId", this.emp.empId ).subscribe( value => {
      if ( value ) {
        this.leaves = value;
        this.loadLeave();
      }
    } );

  }

  ngOnDestroy(): void {
    this.sheetSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }

  updateTimeTable( $event: PageEvent ): void {
    this.sheetSize = $event.pageSize;
    this.sheetIndex = $event.pageIndex;
    this.loadTimeSheet();
  }

  updateLeaveTable( $event: PageEvent ): void {
    this.leaveSize = $event.pageSize;
    this.leaveIndex = $event.pageIndex;
    this.loadLeave();
  }

  private loadTimeSheet(): void {
    const filtered = this.timeSheets.filter( ( value, index ) => {
      return (index >= this.sheetIndex * this.sheetSize && index <= (this.sheetIndex * this.sheetSize + this.sheetSize - 1));
    } );
    this.sheetData = new MatTableDataSource<any>( filtered );
  }

  private loadLeave(): void {
    const filtered = this.leaves.filter( ( value, index ) => {
      return (index >= this.leaveIndex * this.leaveSize && index <= (this.leaveIndex * this.leaveSize + this.leaveSize - 1));
    } );
    this.leaveData = new MatTableDataSource<any>( filtered );
  }
}
