import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { loadTrigger } from "../../../shared/animations";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { LeaveModel, UserModel } from "../../../model/models.model";
import firebase from "firebase";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { LeaveService } from "../../../services/leave.service";
import { Subscription } from "rxjs";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
              selector: "app-annual-leave",
              templateUrl: "./annual-leave.component.html",
              styleUrls: [ "./annual-leave.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AnnualLeaveComponent implements OnInit, OnDestroy {

  leaves: LeaveModel[] = [];
  user: UserModel;
  @ViewChild( "leaveForm" ) leaveForm: NgForm;

  uSub: Subscription;
  lSub: Subscription;

  displayedColumns = [ "startDate", "endDate", "reason", "type" ];

  dataSource = new MatTableDataSource<LeaveModel>( this.leaves );

  minDate = new Date();
  stDate: Date;
  edDate: Date;

  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  pageSize = 5;
  pageIndex = 0;

  myFilter = ( d: Date | null ): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  leaveType: string;
  reason: string;

  constructor( public userService: UserService,
               private route: ActivatedRoute,
               private leaveService: LeaveService ) { }

  ngOnInit() {
    const uId = this.route.snapshot.parent.params["uId"];

    this.uSub = this.userService.fetchUser( "uId", "==", uId )
                    .valueChanges()
                    .subscribe( ( value ) => {
                      if ( value?.length > 0 ) {
                        this.user = value[0];
                      }
                    } );

    this.lSub = this.leaveService.fetchLeave( "uId", "==", uId )
                    .valueChanges()
                    .subscribe( ( value ) => {
                      if ( value?.length > 0 ) {
                        this.leaves = value;
                        this.dataSource = new MatTableDataSource<LeaveModel>( this.leaves );
                      }
                    } );

    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.uSub.unsubscribe();
    this.lSub.unsubscribe();
  }

  onSubmit(): void {

    const leave: LeaveModel = {
      uId: this.user.uId,
      lId: "temp",
      approved: false,
      uName: this.user.uName,
      status: "request",
      startDate: Timestamp.fromDate( this.stDate ),
      endDate: Timestamp.fromDate( this.edDate ),
      reason: this.reason,
      type: this.leaveType
    };

    this.leaveService.addLeave( leave );

    this.resetForm();

  }

  loadValues(): void {
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
  }

  resetForm(): void {
    this.leaveForm.resetForm();
  }

}
