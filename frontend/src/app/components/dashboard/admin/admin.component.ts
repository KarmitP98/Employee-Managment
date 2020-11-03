import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../../shared/animations";
import { UserService } from "../../../services/user.service";
import { LeaveService } from "../../../services/leave.service";
import { WorklogService } from "../../../services/worklog.service";

@Component( {
              selector: "app-admin",
              templateUrl: "./admin.component.html",
              styleUrls: [ "./admin.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AdminComponent implements OnInit, OnDestroy {

  constructor( private userService: UserService, private leaveService: LeaveService, private timeSheetService: WorklogService ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

}
