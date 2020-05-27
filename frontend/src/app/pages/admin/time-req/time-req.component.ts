import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { loadTrigger } from "../../../shared/shared";
import { ADMIN_STATUS, EmployeeService } from "../../../shared/employee.service";
import { TimeSheetService } from "../../../shared/time-sheet.service";
import { Timesheet } from "../../../shared/model/timesheet.model";
import { Employee } from "../../../shared/model/employee.model";


@Component( {
              selector: "app-time-req",
              templateUrl: "./time-req.component.html",
              styleUrls: [ "./time-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeReqComponent implements OnInit, OnDestroy {

  timeSheets: Timesheet[] = [];
  empSub: Subscription;
  allEmpSub: Subscription;
  sheetSub: Subscription;
  employee: Employee;
  empId: string;
  displayedColumns: string[] = [ "select", "userId", "logDate", "startTime", "endTime", "work", "status" ];
  selectedReq: Timesheet;
  dataSource = new MatTableDataSource<Timesheet>( this.timeSheets );
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  @ViewChild( MatSort, { static: true } ) sort: MatSort;
  pageSize = 5;
  pageIndex = 0;
  hours: { value: string, label: string }[] = [];

  dataSet = {
    chart: {
      caption: "Total Hours Logged",
      plottooltext: "Employee <b>$label logged</b> <b>$value</b> hours!",
      showlegend: "1",
      showpercentvalues: "1",
      legendposition: "right",
      usedataplotcolorforlabels: "1",
      theme: "fusion"
    },
    data: []
  };

  chartConfig = {
    width: "1000",
    height: "600",
    type: "pie2d",
    dataFormat: "json"
  };

  constructor( private employeeService: EmployeeService, private timeSheetService: TimeSheetService ) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.empSub = this.employeeService.employeeSubject.subscribe( emp => {
      if ( emp ) {
        this.employee = emp;
        this.empId = emp.empId;
        this.getValues();
      }
    } );

    this.allEmpSub = this.employeeService.fetchEmployees().subscribe( value => {
      this.hours = [];
      for ( const v of value ) {
        this.hours.push( { value: v.totalHours + "", label: v.empName } );
      }
      // Dont worry about this code duplication I have some plans for this...
      this.dataSet.data = [];
      console.log( this.hours );
      this.dataSet.data.push( ...this.hours );
    } );

  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.sheetSub.unsubscribe();
    this.allEmpSub.unsubscribe();
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
    const filtered = this.timeSheets.filter( ( value, index ) => {
      return (index >= this.pageIndex * this.pageSize && index <= (this.pageIndex * this.pageSize + this.pageSize - 1));
    } );
    this.dataSource = new MatTableDataSource<Timesheet>( filtered );
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.getValues();
    // this.loadValues();
  }

  getValues() {
    this.sheetSub = this.timeSheetService.fetchTimeSheets().subscribe(
      value => {
        this.timeSheets = value;
        this.loadValues();
      } );

  }
}
