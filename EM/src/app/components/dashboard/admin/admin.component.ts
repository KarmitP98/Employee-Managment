import { Component, OnDestroy, OnInit } from "@angular/core";
import { loadTrigger } from "../../../shared/animations";

@Component( {
              selector: "app-admin",
              templateUrl: "./admin.component.html",
              styleUrls: [ "./admin.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AdminComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {

  }

}
