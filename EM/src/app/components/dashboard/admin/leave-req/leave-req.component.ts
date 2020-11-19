import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../../../shared/animations";
import { UserService } from "../../../../services/user.service";
import { LeaveService } from "../../../../services/leave.service";
import { Subscription } from "rxjs";
import { LeaveModel } from "../../../../model/models.model";
import { ActivatedRoute } from "@angular/router";
import { LogoService } from "../../../../services/logo.service";

@Component( {
              selector: "app-leave-req",
              templateUrl: "./leave-req.component.html",
              styleUrls: [ "./leave-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class LeaveReqComponent implements OnInit, OnDestroy {

  leaves: LeaveModel[] = [];
  leaveSub: Subscription;

  constructor( private userService: UserService,
               private leaveService: LeaveService,
               private route: ActivatedRoute,
               public logoService: LogoService ) {

  }

  ngOnInit() {
    const uId = this.route.snapshot.parent.parent.params["uId"];

    this.leaveSub = this.leaveService.fetchLeave()
                        .valueChanges()
                        .subscribe( value => {
                          if ( value?.length > 0 ) {
                            this.leaves = value;
                          }
                        } );
  }


  ngOnDestroy(): void {
    this.leaveSub.unsubscribe();
  }

  getPendingReq(): any {
    return this.leaves.filter( leave => !leave.approved );
  }

  getApprovedReq(): any {
    return this.leaves.filter( leave => leave.approved );
  }
}
