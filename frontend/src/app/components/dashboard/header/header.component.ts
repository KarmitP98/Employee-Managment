import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { COMPANY_NAME } from "../../../shared/constants";

@Component( {
              selector: "app-header",
              templateUrl: "./header.component.html",
              styleUrls: [ "./header.component.css" ]
            } )
export class HeaderComponent implements OnInit, OnDestroy {

  @Input( "data" ) data: { isAdmin: boolean };
  companyName = COMPANY_NAME;

  constructor( private userService: UserService ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  logOut(): void {
    this.userService.logOut();
  }

}
