import { Component, OnDestroy, OnInit } from "@angular/core";
import { Leave } from "../../shared/model/leaves.model";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material";
import { loadTrigger } from "../../shared/shared";
import { ADMIN_STATUS, EmployeeService } from "../../shared/employee.service";
import { LeaveService } from "../../shared/leave.service";
import { Employee } from "../../shared/model/employee.model";

@Component( {
              selector: "app-leave-req",
              templateUrl: "./leave-req.component.html",
              styleUrls: [ "./leave-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class LeaveReqComponent implements OnInit, OnDestroy {

  leaves: Leave[] = [];
  empSub: Subscription;
  leaveSub: Subscription;
  employee: Employee;
  empId: string;
  displayedColumns: string[] = [ "select", "empId", "startDate", "endDate", "reason", "status" ];
  selectedReq: Leave;
  dataSource: MatTableDataSource<any>;

  constructor( private employeeService: EmployeeService, private leaveService: LeaveService ) { }

  ngOnInit() {
    this.empSub = this.employeeService.employeeSubject.subscribe( emp => {
      if ( emp ) {
        this.employee = emp;
        this.empId = emp.empId;

        this.leaveSub = this.leaveService.fetchLeaves( "empId", emp.empId ).subscribe( value => {
          this.dataSource = new MatTableDataSource<any>( value );
        } );
      }
    } );
  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }

  changeStatus( b: boolean ): void {
    this.selectedReq.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.leaveService.updateLeave( this.selectedReq, this.selectedReq.leaveId );
    this.selectedReq = null;
  }

  removeReq(): void {
    this.leaveService.removeLeave( this.selectedReq );
    this.selectedReq = null;
  }

}
