import { Component, OnDestroy, OnInit } from "@angular/core";
import { ADMIN_STATUS, EmployeeService } from "../../shared/employee.service";
import { Employee } from "../../shared/model/employee.model";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { LeaveService } from "../../shared/leave.service";
import { Leave } from "../../shared/model/leaves.model";
import { TimeSheet } from "../../shared/model/time-sheet";
import { loadTrigger } from "../../shared/shared";

@Component( {
              selector: "app-admin-req",
              templateUrl: "./admin-req.component.html",
              styleUrls: [ "./admin-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AdminReqComponent implements OnInit, OnDestroy {

  emps: Employee[] = [];
  curEmp: Employee;
  empId: string;
  empSub: Subscription;
  curEmpSub: Subscription;
  selectedReq: Employee;
  displayedColumns = [ "select", "userId", "abv", "userName", "userEmail", "adminStatus" ];
  dataSource: MatTableDataSource<Employee>;
  leaves: Leave[];
  timesheets: TimeSheet[];

  constructor( private employeeService: EmployeeService, private leaveService: LeaveService, private timeSheetService: TimeSheetService ) { }

  ngOnInit() {

    this.curEmpSub = this.employeeService.employeeSubject.subscribe( value => {
      this.curEmp = value;
    } );

    this.empSub = this.employeeService.fetchEmployees().subscribe( ( value ) => {
      this.emps = value.filter( value1 => {
        return value1.empId !== this.curEmp.empId;
      } );
      this.loadValues();
    } );
  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.curEmpSub.unsubscribe();
  }

  changeAdmin( response: boolean ): void {

    this.selectedReq.adminStatus = response ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.selectedReq.isAdmin = response;

    this.employeeService.updateEmployee( this.selectedReq, this.selectedReq.empId );
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<Employee>( this.emps );
  }

}
