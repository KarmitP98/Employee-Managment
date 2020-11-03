import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { COMPANY_NAME, loadTrigger } from "../../shared/animations";
import { UserService } from "../../services/user.service";

@Component( {
              selector: "app-login",
              templateUrl: "./login.component.html",
              styleUrls: [ "./login.component.css" ],
              animations: [ loadTrigger ]
            } )
export class LoginComponent implements OnInit, OnDestroy {

  companyName = COMPANY_NAME;
  @ViewChild( "f" ) form: NgForm;
  admin: boolean = false;
  email: string;
  password: string;

  constructor( private employeeService: UserService, private router: Router, private snackBar: MatSnackBar ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {
    this.employeeService.login( this.email, this.password );
  }


  private showError( error: string ): void {
    this.snackBar.open( error, "Close", {
      duration: 2000
    } );
  }

}
