import { Component, OnInit, ViewChild } from "@angular/core";
import { COMPANY_NAME } from "../../shared/constants";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LogoService } from "../../services/logo.service";
import { loadTrigger } from "../../shared/animations";

@Component( {
              selector: "app-login",
              templateUrl: "./login.component.html",
              styleUrls: [ "./login.component.scss" ],
              animations: [ loadTrigger ]
            } )
export class LoginComponent implements OnInit {

  companyName = COMPANY_NAME;
  @ViewChild( "f" ) form: NgForm;
  admin: boolean = false;
  email: string;
  password: string;
  recaptcha: boolean;

  constructor( private userService: UserService,
               private router: Router,
               private snackBar: MatSnackBar,
               public logoService: LogoService ) {}

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {
    this.userService.loginWithEmailandPassword( this.email, this.password );
  }

  loginWith( provider: string ): void {
    this.userService.loginWithProvider( provider );
  }

  resolved( $event: string ): void {
    console.log( $event );
  }

  private showError( error: string ): void {
    this.snackBar.open( error, "Close", {
      duration: 2000
    } );
  }

}
