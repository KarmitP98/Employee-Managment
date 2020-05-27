import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { LeaveService } from "../../shared/leave.service";
import { EmployeeService } from "../../shared/employee.service";
import { Subscription } from "rxjs";
import { Leave } from "../../shared/model/leaves.model";
import { NgForm } from "@angular/forms";
import { MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";
import { loadTrigger, MONTHS } from "../../shared/shared";
import { Employee } from "../../shared/model/employee.model";

@Component( {
              selector: "app-annual-leave",
              templateUrl: "./annual-leave.component.html",
              styleUrls: [ "./annual-leave.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AnnualLeaveComponent implements OnInit, OnDestroy {

  leaveSub: Subscription;
  empSub: Subscription;
  leaves: Leave[] = [];
  empId: string;
  employee: Employee;
  @ViewChild( "leaveForm", { static: false } ) leaveForm: NgForm;
  displayedColumns = [ "startDate", "endDate", "reason", "status", "leaveId" ];
  dataSource = new MatTableDataSource<Leave>( this.leaves );
  minDate = new Date();
  date: Date;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  pageSize = 5;
  pageIndex = 0;

  myFilter = ( d: Date | null ): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor( private leaveService: LeaveService, private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    //Get empId to fetch leaves of that employee
    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.empId = value.empId;
        this.employee = value;

        // Fetch leaves of that employee
        this.leaveSub = this.leaveService.fetchLeaves( "empId", this.empId ).subscribe( value => {
          if ( value ) {
            this.leaves = value;
            this.loadValues();
          }
        } );
      }
    } );


  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }

  onSubmit(): void {
    const startDate = new Date( this.leaveForm.value.startDate );
    const endDate = new Date( this.leaveForm.value.endDate );
    const tempLeave =
      new Leave( this.empId, "placeholder",
                 MONTHS[startDate.getMonth()] + " " + startDate.getDate() + ", " + startDate.getFullYear(),
                 MONTHS[endDate.getMonth()] + " " + endDate.getDate() + ", " + endDate.getFullYear(), this.leaveForm.value.reason,
                 "Pending", false, this.employee.empName );
    this.leaveService.addLeave( tempLeave );
  }

  loadValues(): void {
    this.dataSource = new MatTableDataSource<Leave>( this.leaves.filter( ( value, index ) => {
      return (index >= this.pageIndex * this.pageSize && index <= (this.pageIndex * this.pageSize + this.pageSize - 1));
    } ) );
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.loadValues();
  }
}
