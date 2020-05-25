import { Component, OnDestroy, OnInit } from "@angular/core";
import { LeaveService } from "../../shared/leave.service";
import { Leave } from "../../shared/model/leaves.model";
import { Subscription } from "rxjs";
import { ADMIN_STATUS } from "../../shared/employee.service";
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
  leaveSub: Subscription;
  displayedColumns: string[] = [ "select", "userId", "startDate", "endDate", "reason", "status" ];
  selectedReq: Leave;
  dataSource: MatTableDataSource<Leave>;

  constructor( private leaveService: LeaveService ) { }

  ngOnInit() {
    this.leaveSub = this.leaveService.fetchLeaves( false ).subscribe( value => {
      if ( value.length > 0 ) {
        this.leaves = value;
        this.loadValues();
      }
    } );
  }

  ngOnDestroy(): void {
    this.leaveSub.unsubscribe();
  }

  changeStatus( b: boolean ): void {
    this.selectedReq.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.leaveService.updateLeave( this.selectedReq, this.selectedReq.leaveId );
    this.selectedReq = null;
  }

  removeReq(): void {
    this.leaveService.removeLeave( this.selectedReq.empId );
    this.leaves = this.leaves.filter( value => {
      return value.empId !== this.selectedReq.empId;
    } );
    this.loadValues();
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<Leave>( this.leaves );
  }
}
