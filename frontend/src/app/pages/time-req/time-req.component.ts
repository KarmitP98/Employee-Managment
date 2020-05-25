import { Component, OnDestroy, OnInit } from "@angular/core";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { TimeSheet } from "../../shared/model/time-sheet";
import { Subscription } from "rxjs";
import { ADMIN_STATUS } from "../../shared/employee.service";
import { MatTableDataSource } from "@angular/material";
import { loadTrigger } from "../../shared/shared";


@Component( {
              selector: "app-time-req",
              templateUrl: "./time-req.component.html",
              styleUrls: [ "./time-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeReqComponent implements OnInit, OnDestroy {

  timeSheets: TimeSheet[] = [];
  timeSheetSub: Subscription;
  displayedColumns: string[] = [ "select", "userId", "logDate", "startTime", "endTime", "work", "status" ];
  selectedReq: TimeSheet;
  dataSource: MatTableDataSource<TimeSheet>;


  constructor( private timeSheetService: TimeSheetService ) { }

  ngOnInit() {
    this.timeSheetSub = this.timeSheetService.fetchTimeSheets( false ).subscribe( value => {
      this.timeSheets = value;
      this.loadValues();
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
  }

  changeStatus( b: boolean ) {
    const status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.selectedReq.status = status;
    this.timeSheetService.updateTimeSheet( this.selectedReq, this.selectedReq.sheetId );
    this.selectedReq = null;
  }

  removeReq(): void {
    this.timeSheetService.removeTimeSheet( this.selectedReq.empId );
    this.timeSheets = this.timeSheets.filter( value => {
      return value.empId !== this.selectedReq.empId;
    } );
    this.loadValues();
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<TimeSheet>( this.timeSheets );
  }
}
