import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../../../shared/animations";
import { UserService } from "../../../../services/user.service";
import { PageEvent } from "@angular/material/paginator";
import { WorklogService } from "../../../../services/worklog.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { WorkLogModel } from "../../../../model/models.model";


@Component( {
              selector: "app-time-req",
              templateUrl: "./time-req.component.html",
              styleUrls: [ "./time-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeReqComponent implements OnInit, OnDestroy {

  // dataSet = {
  //   chart: {
  //     caption: "Total Hours Logged",
  //     plottooltext: "Employee <b>$label logged $value</b> hours!",
  //     showlegend: "1",
  //     showpercentvalues: "1",
  //     legendposition: "top",
  //     usedataplotcolorforlabels: "1",
  //     theme: "fusion",
  //     defaultcenterlabel: "Hour Distribution"
  //   },
  //   data: []
  // };
  //
  // chartConfig = {
  //   width: "1000",
  //   height: "600",
  //   type: "doughnut2d",
  //   dataFormat: "json"
  // };


  logs: WorkLogModel[] = [];
  logSub: Subscription;

  constructor( private employeeService: UserService, private timeSheetService: WorklogService,
               private route: ActivatedRoute ) {


  }

  ngOnInit() {
    const uId = this.route.snapshot.parent.parent.params["uId"];

    this.logSub = this.timeSheetService.fetchWorkLog( "uId", "==", uId )
                      .valueChanges()
                      .subscribe( value => {
                        if ( value?.length > 0 ) {
                          this.logs = value;
                          this.loadValues();
                        }
                      } );
  }

  ngOnDestroy(): void {
  }

  loadValues() {
  }

  updateTable( $event: PageEvent ): void {
  }

  changeStatus( b: boolean ) {

  }

  removeReq(): void {
  }

}


