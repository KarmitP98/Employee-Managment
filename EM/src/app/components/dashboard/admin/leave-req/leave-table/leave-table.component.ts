import { Component, Input, OnInit } from "@angular/core";
import { LeaveModel } from "../../../../../model/models.model";
import { LeaveService } from "../../../../../services/leave.service";

@Component( {
              selector: "app-leave-table",
              templateUrl: "./leave-table.component.html",
              styleUrls: [ "./leave-table.component.css" ]
            } )
export class LeaveTableComponent implements OnInit {

  @Input( "leaves" ) leaves: LeaveModel[] = [];

  constructor( private leaveService: LeaveService ) { }

  ngOnInit(): void {
  }

  changeStatus( req: LeaveModel, approve: boolean ): void {
    req.approved = approve;
    this.leaveService.updateLeave( req );
  }

  DaysBetween( StartDate, EndDate ) {
    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC( EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate() );
    const end = Date.UTC( StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate() );

    // so it's safe to divide by 24 hours
    return (start - end) / oneDay;
  }
}
