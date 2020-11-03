import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { loadTrigger } from "../../../shared/animations";
import { ADMIN_STATUS, UserService } from "../../../services/user.service";
import { WorklogService } from "../../../services/worklog.service";
import { Timesheet } from "../../../model/timesheet.model";
import { Employee } from "../../../model/employee.model";


@Component( {
              selector: "app-time-req",
              templateUrl: "./time-req.component.html",
              styleUrls: [ "./time-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeReqComponent implements OnInit, OnDestroy {

  timeSheets: Timesheet[] = [];
  data: { empName: string, logDate: string, startTime: string, hours: number, work: string, status: string }[] = [];
  empSub: Subscription;
  allEmpSub: Subscription;
  sheetSub: Subscription;
  employee: Employee;
  empId: string;
  displayedColumns: string[] = [ "select", "empName", "logDate", "startTime", "hours", "work", "status" ];
  selectedReq: Timesheet;
  dataSource = new MatTableDataSource<any>( this.data );
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  @ViewChild( MatSort, { static: true } ) sort: MatSort;
  pageSize = 5;
  pageIndex = 0;
  hours: { value: string, label: string }[] = [];

  dataSet = {
    chart: {
      caption: "Total Hours Logged",
      plottooltext: "Employee <b>$label logged $value</b> hours!",
      showlegend: "1",
      showpercentvalues: "1",
      legendposition: "top",
      usedataplotcolorforlabels: "1",
      theme: "fusion",
      defaultcenterlabel: "Hour Distribution"
    },
    data: []
  };

  chartConfig = {
    width: "1000",
    height: "600",
    type: "doughnut2d",
    dataFormat: "json"
  };

  constructor( private employeeService: UserService, private timeSheetService: WorklogService ) { }

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
      this.dataSet.data.push( ...this.hours );
    } );

  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.sheetSub.unsubscribe();
    this.allEmpSub.unsubscribe();
  }

  getValues() {
    this.sheetSub = this.timeSheetService.fetchWorkLog().subscribe(
      value => {
        this.timeSheets = value;
        this.loadValues();
      } );
  }

  loadValues() {
    const filtered = this.timeSheets.filter( ( value, index ) => {
      return (index >= this.pageIndex * this.pageSize && index <= (this.pageIndex * this.pageSize + this.pageSize - 1));
    } );
    this.dataSource = new MatTableDataSource<any>( filtered );
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.loadValues();
  }

  changeStatus( b: boolean ) {
    this.selectedReq.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    console.log( this.selectedReq );
    this.timeSheetService.updateTimeSheet( this.selectedReq, this.selectedReq.sheetId );
    this.selectedReq = null;
  }


  removeReq(): void {
    let tempSub: Subscription;
    tempSub = this.employeeService.fetchEmployees( "empId", this.selectedReq.empId ).subscribe( value => {
      value[0].totalHours -= this.selectedReq.hours;
      console.log( value[0] );
      this.employeeService.updateUser( value[0], value[0].empId );
      tempSub.unsubscribe();
      this.timeSheetService.removeTimeSheet( this.selectedReq );
      this.selectedReq = null;
    } );


  }

}
