import { Injectable, OnInit } from "@angular/core";
import { Employee } from "../model/employee.model";
import { BehaviorSubject, Subscription, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { StatService } from "./stat.service";

export enum ADMIN_STATUS {
  pending = "Pending",
  approved = "Approved",
  declined = "Declined"
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class User {

  constructor( public email: string,
               public id: string,
               private _token: string,
               private _tokenExpirationDate: Date ) {}

  get token(): string {
    if ( !this._tokenExpirationDate || new Date() > this._tokenExpirationDate ) {
      return null;
    }
    return this._token;
  }
}


@Injectable( {
               providedIn: "root"
             } )
export class EmployeeService implements OnInit {

  employeeSubject = new BehaviorSubject<Employee>( null );
  sub: Subscription;
  loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  API_KEY = environment.APIKey;
  private tokenExpirationTimer: any;


  constructor( private http: HttpClient, private router: Router, private firestore: AngularFireDatabase, private statService: StatService ) { }

  ngOnInit(): void {
  }

  // Fetch the employee data from Server
  fetchEmployees( child?: string, value?: string | number | boolean ) {
    if ( child ) {
      return this.firestore.list<Employee>( "employees", ref => ref.orderByChild( child ).equalTo( value ) ).valueChanges();
    }
    return this.firestore.list<Employee>( "employees" ).valueChanges();
  }

  storeEmployee( emp: Employee ) {
    this.firestore.list( "employees" ).push( emp ).then( value => {
      emp.empId = value.key;
      this.updateEmployee( emp, value.key );
    } );
  }

  updateEmployee( emp: Employee, empId: string ) {
    this.firestore.list( "employees" ).set( empId, emp );
  }

  login( email: string, password: string ) {
    this.http.post<AuthResponseData>( this.loginUrl + this.API_KEY, { email: email, password: password, returnSecureToken: true } )
        .pipe(
          catchError( this.handleError ) ).subscribe( resData => {
      this.handleAuth( resData.email, resData.idToken, +resData.expiresIn, resData.localId );
    } );
  }

  signUp( email: string, password: string, emp: Employee ) {
    this.http.post<AuthResponseData>( this.signUpUrl + this.API_KEY,
                                      {
                                        email: email,
                                        password: password,
                                        returnSecureToken: true
                                      } )
        .pipe( catchError( this.handleError ) ).subscribe( resData => {
      this.storeEmployee( emp );
      this.handleAuth( resData.email, resData.idToken, +resData.expiresIn, resData.localId );
    } );
  }

  logout(): void {
    if ( this.tokenExpirationTimer ) {
      clearTimeout( this.tokenExpirationTimer );
    }
    this.tokenExpirationTimer = null;
    this.employeeSubject.next( null );  // Clear current subject
    localStorage.removeItem( "userData" );  // Clear local storage
    this.router.navigate( [ "/login" ] );
  }

  autoLogout( expirationDuration: number ) {
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    }, expirationDuration );
  }

  autoLogin( email: string ): void {
    this.sub = this.fetchEmployees( "empEmail", email ).subscribe( value => {
      this.employeeSubject.next( value[0] );
      this.sub.unsubscribe();
    } );

  }

  private handleAuth( email: string, token: string, expireIn: number, id: string ) {
    const expiration = new Date( new Date().getTime() + expireIn * 1000 );
    const user = new User( email, id,
                           token, expiration );
    this.autoLogout( expireIn * 1000 );

    // Save the current user data to local sotrage
    localStorage.setItem( "userData", JSON.stringify( user ) );

    this.sub = this.fetchEmployees( "empEmail", email ).subscribe( value => {
      this.employeeSubject.next( value[0] );
      this.router.navigate( [ "/home" ] );
      this.sub.unsubscribe();
    } );

  }

  private handleError( errRes: HttpErrorResponse ) {
    let errorMsg = "An unknown error occured!";
    if ( !errRes.error || !errRes.error.error ) {
      return throwError( errorMsg );
    }
    switch ( errRes.error.error.message ) {
      case "EMAIL_EXISTS":
        errorMsg = "The email exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "This email is invald";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "Pasword is incorrect";
        break;
    }
    return throwError( errorMsg );
  }
}