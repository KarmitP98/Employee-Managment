import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { loadTrigger } from "../../shared/shared";
import { Employee } from "../../shared/model/employee.model";
import { ADMIN_STATUS, EmployeeService } from "../../shared/employee.service";

@Component( {
              selector: "app-login",
              templateUrl: "./login.component.html",
              styleUrls: [ "./login.component.css" ],
              animations: [ loadTrigger ]
            } )
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild( "f", { static: false } ) form: NgForm;
  companyName = "ABC Company";
  isLoginMode: boolean = true;
  admin: boolean = false;
  emps: Employee[] = [];
  errorSub: Subscription;

  constructor( private employeeService: EmployeeService, private router: Router, private snackBar: MatSnackBar ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {
    console.log( "submit Called" );
    const email = this.form.value.email;
    const password = this.form.value.password;
    const abv = this.form.value.abv;
    const isAdmin = this.form.value.isAdmin;
    const name = this.form.value.name;
    const newEmp: Employee = new Employee( "Placeholder", abv, name, email, false, ADMIN_STATUS.pending, password, 0 );

    this.isLoginMode ?
      this.employeeService.login( email, password, newEmp ) :
      this.employeeService.signUp( email, password, newEmp );

  }

  switchModes(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  private showError( error: string ): void {
    this.snackBar.open( error, "Close", {
      duration: 2000
    } );
  }

}
