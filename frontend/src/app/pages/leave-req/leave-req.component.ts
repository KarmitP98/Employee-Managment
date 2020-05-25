import { Component, OnDestroy, OnInit } from "@angular/core";
import { Leave } from "../../shared/model/leaves.model";
import { Subscription } from "rxjs";
import { ADMIN_STATUS, DataStorageService } from "../../shared/data-storage.service";
import { MatTableDataSource } from "@angular/material";
import { loadTrigger } from "../../shared/shared";

@Component( {
              selector: "app-leave-req",
              templateUrl: "./leave-req.component.html",
              styleUrls: [ "./leave-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class LeaveReqComponent implements OnInit, OnDestroy {

  leaves: Leave[] = [];
  storageSub: Subscription;
  displayedColumns: string[] = [ "select", "userId", "startDate", "endDate", "reason", "status" ];
  selectedReq: Leave;
  dataSource: MatTableDataSource<Leave>;

  constructor( private dataStorageService: DataStorageService ) { }

  ngOnInit() {
    this.storageSub = this.dataStorageService.fetchEmployees().subscribe( value => {
      if ( value ) {
        for ( let e of value ) {
          this.leaves.push( ...e.Leaves );
        }
      }
      this.dataSource = new MatTableDataSource<Leave>( this.leaves );
    } );
  }

  ngOnDestroy(): void {
    this.storageSub.unsubscribe();
  }

  changeStatus( b: boolean ): void {
    this.selectedReq.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.dataStorageService.updateLeave( this.selectedReq, this.selectedReq.leaveId );
    this.selectedReq = null;
  }

  removeReq(): void {
    this.dataStorageService.removeLeave( this.selectedReq );
    // this.leaves = this.leaves.filter( value => {
    //   return value.empId !== this.selectedReq.empId;
    // } );
    // this.loadValues();
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<Leave>( this.leaves );
  }
}
