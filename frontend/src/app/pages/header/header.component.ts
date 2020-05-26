import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DataStorageService } from "../../shared/data-storage.service";
import { Employee } from "../../shared/model/employee.model";

@Component( {
              selector: "app-header",
              templateUrl: "./header.component.html",
              styleUrls: [ "./header.component.css" ]
            } )
export class HeaderComponent implements OnInit, OnDestroy {

  public isAdmin: boolean = false;
  isAuth: boolean = false;
  private userSub: Subscription;
  private emp: Employee;

  constructor( public dataStorageService: DataStorageService ) { }

  ngOnInit() {
    this.userSub = this.dataStorageService.employeeSubject.subscribe( ( value: Employee ) => {
      this.isAuth = !!value;
      if ( this.isAuth ) {
        this.emp = value;
        this.isAdmin = this.emp.isAdmin;
      }
    } );
  }

  onLogout(): void {
    this.dataStorageService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
