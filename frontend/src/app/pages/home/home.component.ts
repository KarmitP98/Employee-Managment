import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { loadTrigger } from "../../shared/shared";
import { EmployeeService } from "../../shared/employee.service";
import { Employee } from "../../shared/model/employee.model";

@Component( {
              selector: "app-home",
              templateUrl: "./home.component.html",
              styleUrls: [ "./home.component.css" ],
              animations: [ loadTrigger ]
            } )
export class HomeComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  employee: Employee;
  private sub: Subscription;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.sub = this.employeeService.employeeSubject.subscribe( value => {
      const isAuth = !!value;
      if ( isAuth ) {
        this.isAdmin = value.isAdmin;
        this.employee = value;
      } else {
        this.isAdmin = false;
        this.employee = null;
      }
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
