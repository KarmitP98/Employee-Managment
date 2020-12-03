import { Component, OnDestroy, OnInit } from "@angular/core";
import { LoggerService } from "../../services/logger.service";
import { LogModel } from "../../model/models.model";
import { Subscription } from "rxjs";

@Component( {
              selector: "app-logs",
              templateUrl: "./logs.component.html",
              styleUrls: [ "./logs.component.scss" ]
            } )
export class LogsComponent implements OnInit, OnDestroy {
  logs: LogModel[] = [];
  logSub: Subscription;

  constructor( public loggerService: LoggerService ) { }

  ngOnInit(): void {
    this.logSub = this.loggerService.fetchLogs()
                      .subscribe( value => {
                        if ( value?.length > 0 ) {
                          this.logs = value;
                        }
                      } );
  }

  ngOnDestroy(): void {
    this.logSub.unsubscribe();
  }

}
