import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { EmployeeService } from "../../shared/employee.service";
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

  constructor( public employeeService: EmployeeService ) { }

  ngOnInit() {
    this.userSub = this.employeeService.employeeSubject.subscribe( ( value: Employee ) => {
      this.isAuth = !!value;
      if ( this.isAuth ) {
        this.emp = value;
        this.isAdmin = this.emp.isAdmin;
      }
    } );
  }

  onLogout(): void {
    this.employeeService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
