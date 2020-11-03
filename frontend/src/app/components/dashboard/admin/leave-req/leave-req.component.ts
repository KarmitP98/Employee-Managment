import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../../../shared/animations";
import { UserService } from "../../../../services/user.service";
import { LeaveService } from "../../../../services/leave.service";

@Component( {
              selector: "app-leave-req",
              templateUrl: "./leave-req.component.html",
              styleUrls: [ "./leave-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class LeaveReqComponent implements OnInit, OnDestroy {

  // leaves: Leave[] = [];
  // empSub: Subscription;
  // leaveSub: Subscription;
  // employee: Employee;
  // empId: string;
  // displayedColumns: string[] = [ "select", "empName", "startDate", "endDate", "reason", "status" ];
  // selectedReq: Leave;
  // dataSource = new MatTableDataSource<Leave>( this.leaves );
  // @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  // pageSize = 5;
  // pageIndex = 0;

  constructor( private userService: UserService, private leaveService: LeaveService ) { }

  ngOnInit() {
    // this.empSub = this.userService.employeeSubject.subscribe( emp => {
    //   if ( emp ) {
    //     this.employee = emp;
    //     this.empId = emp.empId;
    //
    //     this.getValue();
    //   }
    // } );
  }

  // private getValue(): void {
  //
  //   this.leaveSub = this.leaveService.fetchLeaves().subscribe( value => {
  //     this.leaves = value;
  //     console.log();
  //     this.loadValues();
  //   } );
  // }

  ngOnDestroy(): void {
    // this.empSub.unsubscribe();
    // this.leaveSub.unsubscribe();
  }

  //
  // changeStatus( b: boolean ): void {
  //   this.selectedReq.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
  //   this.leaveService.updateLeave( this.selectedReq, this.selectedReq.leaveId );
  //   this.selectedReq = null;
  // }
  //
  // removeReq(): void {
  //   this.leaveService.removeLeave( this.selectedReq );
  //   this.selectedReq = null;
  // }
  //
  // updateTable( $event: PageEvent ): void {
  //   this.pageSize = $event.pageSize;
  //   this.pageIndex = $event.pageIndex;
  //   this.loadValues();
  // }
  //
  // private loadValues(): void {
  //   this.dataSource = new MatTableDataSource<Leave>( this.leaves.filter( ( value, index ) => {
  //     return (index >= this.pageIndex * this.pageSize && index <= (this.pageIndex * this.pageSize + this.pageSize - 1));
  //   } ) );
  // }
}
