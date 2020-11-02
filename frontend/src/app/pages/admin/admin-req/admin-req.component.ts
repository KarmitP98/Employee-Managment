import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Employee } from "../../../model/employee.model";
import { Subscription } from "rxjs";
import { MatDialog, MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";
import { loadTrigger } from "../../../shared/shared";
import { ADMIN_STATUS, EmployeeService } from "../../../services/employee.service";
import { EmployeeDetailComponent } from "../employee-card/employee-detail/employee-detail.component";

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
  displayedColumns = [ "select", "empName", "empEmail", "DOB", "adminStatus" ];
  dataSource = new MatTableDataSource<Employee>( this.emps );
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  pageSize = 5;
  pageIndex = 0;
  listView: boolean = false;


  constructor( private employeeService: EmployeeService, private dialog: MatDialog ) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;

    this.curEmpSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.curEmp = value;
        this.empId = value.empId;

        this.empSub = this.employeeService.fetchEmployees().subscribe( value => {
          this.emps = value.filter( value1 => {
            return value1.empId !== this.curEmp.empId;
          } );
          this.loadValues();
        } );
      }
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
    this.dataSource = new MatTableDataSource<Employee>( this.emps.filter( ( value, index ) => {
      return (index >= this.pageIndex * this.pageSize && index <= (this.pageIndex * this.pageSize + this.pageSize - 1));
    } ) );
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.loadValues();
  }

  switchStyle(): void {
    this.listView = !this.listView;
  }

  openDetails(): void {
    this.dialog.open( EmployeeDetailComponent, { data: this.selectedReq } );
  }
}
