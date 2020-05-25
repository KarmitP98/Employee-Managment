import { Component, OnInit } from "@angular/core";
import { loadTrigger } from "../../shared/shared";

@Component( {
              selector: "app-admin",
              templateUrl: "./admin.component.html",
              styleUrls: [ "./admin.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AdminComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
