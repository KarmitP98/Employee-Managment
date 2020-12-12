import { Component, OnInit, ViewChild } from "@angular/core";
import { COMPANY_NAME } from "../../shared/constants";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LogoService } from "../../services/logo.service";
import { LoggerService } from "../../services/logger.service";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
              selector: "app-login",
              templateUrl: "./login.component.html",
              styleUrls: [ "./login.component.scss" ]
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
               public logoService: LogoService,
               private loggerService: LoggerService ) {}

  ngOnInit() {
    this.loggerService.log( { data: "Login Page Loaded!", time: Timestamp.now() } );
  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {
    this.loggerService.log( { data: "User Requested Login with Email & Password", time: Timestamp.now() } );
    this.userService.loginWithEmailandPassword( this.email, this.password );
  }

  loginWith( provider: string ): void {
    this.loggerService.log( { data: "User Requested Login with provider", time: Timestamp.now() } );
    this.userService.loginWithProvider( provider );
  }

  resolved( $event: string ): void {
    console.log( $event );
  }

}
