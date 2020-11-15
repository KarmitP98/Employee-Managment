import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../../shared/animations";

@Component( {
              selector: "app-time-sheet",
              templateUrl: "./time-sheet.component.html",
              styleUrls: [ "./time-sheet.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeSheetComponent implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

}
