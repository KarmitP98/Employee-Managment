import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../../shared/animations";
import { UserService } from "../../../services/user.service";
import { LeaveService } from "../../../services/leave.service";
import { WorklogService } from "../../../services/worklog.service";
import { LeaveModel, UserModel, WorkLogModel } from "../../../model/models.model";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component( {
              selector: "app-admin",
              templateUrl: "./admin.component.html",
              styleUrls: [ "./admin.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AdminComponent implements OnInit, OnDestroy {

  public user: UserModel;
  public leaves: LeaveModel[] = [];
  public logs: WorkLogModel[] = [];
  public dataSource: any;
  private selected: string = "Leave";
  private userSub: Subscription;
  private logSub: Subscription;
  private leaveSub: Subscription;

  constructor( private userService: UserService,
               private leaveService: LeaveService,
               private timeSheetService: WorklogService,
               private activatedRoute: ActivatedRoute ) {

    const uId = activatedRoute.snapshot.parent.params["uId"];

    this.userSub = this.userService.fetchUser( "uId", "==", uId )
                       .valueChanges()
                       .subscribe( value => {
                         if ( value?.length > 0 ) {
                           this.user = value[0];
                         }
                       } );

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

}
