import { Component, OnDestroy, OnInit } from "@angular/core";
import { TimeSheet } from "../../shared/model/time-sheet";
import { Subscription } from "rxjs";
import { ADMIN_STATUS, DataStorageService } from "../../shared/data-storage.service";
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
  storageSub: Subscription;
  displayedColumns: string[] = [ "select", "userId", "logDate", "startTime", "endTime", "work", "status" ];
  selectedReq: TimeSheet;
  dataSource: MatTableDataSource<TimeSheet>;


  constructor( private dataStorageService: DataStorageService ) { }

  ngOnInit() {
    this.storageSub = this.dataStorageService.fetchEmployees().subscribe( value => {
      if ( value ) {
        for ( const e of value ) {
          this.timeSheets.push( ...e.TimeSheets );
        }
        this.dataSource = new MatTableDataSource<TimeSheet>( this.timeSheets );
      }
    } );
  }

  ngOnDestroy(): void {
    this.storageSub.unsubscribe();
  }

  changeStatus( b: boolean ) {
    this.selectedReq.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    console.log( this.selectedReq );
    this.dataStorageService.updateTimeSheet( this.selectedReq, this.selectedReq.sheetId );
    this.selectedReq = null;
  }

  removeReq(): void {
    this.dataStorageService.removeTimeSheet( this.selectedReq );
    // this.timeSheets = this.timeSheets.filter( value => {
    //   return value.empId !== this.selectedReq.empId;
    // } );
    // this.loadValues();
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<TimeSheet>( this.timeSheets );
  }
}
