import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { loadTrigger } from "../../../shared/animations";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { LeaveModel, UserModel } from "../../../model/models.model";

@Component( {
              selector: "app-annual-leave",
              templateUrl: "./annual-leave.component.html",
              styleUrls: [ "./annual-leave.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AnnualLeaveComponent implements OnInit, OnDestroy {

  empSub: Subscription;
  leaves: LeaveModel[] = [];
  empId: string;
  user: UserModel;
  @ViewChild( "leaveForm" ) leaveForm: NgForm;
  displayedColumns = [ "startDate", "endDate", "reason", "status", "leaveId" ];
  dataSource = new MatTableDataSource<LeaveModel>( this.leaves );
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

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {

  }

  loadValues(): void {
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.loadValues();
  }

  resetForm(): void {
    this.leaveForm.resetForm();
  }
}
