import { Injectable, OnInit } from "@angular/core";
import { Employee } from "./model/employee.model";
import { BehaviorSubject, Subscription, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { Leave } from "./model/leaves.model";
import { TimeSheet } from "./model/time-sheet";

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
export class DataStorageService implements OnInit {

  employeeSubject = new BehaviorSubject<Employee>( null );
  loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  API_KEY = environment.APIKey;
  private tokenExpirationTimer: any;
  sub: Subscription;


  constructor( private http: HttpClient, private router: Router, private firestore: AngularFireDatabase, private snackBar: MatSnackBar ) { }

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
    this.firestore.list( "employees" ).update( empId, emp );
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
    this.fetchEmployees( "empEmail", email ).subscribe( value => {
      this.employeeSubject.next( value[0] );
    } );

  }

  addLeave( leave: Leave ) {
    this.firestore.list<Leave>( "employees/" + leave.empId + "/Leaves" ).push( leave ).then( value => {
      leave.leaveId = value.key;
      this.updateLeave( leave, value.key );
    } );
    this.update();
  }

  private handleError( errRes: HttpErrorResponse ) {
    let errorMsg = "An unknown error occurred!";
    if ( !errRes.error || !errRes.error.error ) {
      return throwError( errorMsg );
    }
    switch ( errRes.error.error.message ) {
      case "EMAIL_EXISTS":
        errorMsg = "Account already exists!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "Invalid Email!";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "Incorrect Password!";
        break;
    }
    return throwError( errorMsg );
  }

  fetchLeaves( empId?: string ) {
    if ( empId ) {
      // return this.firestore.list<Leave>( "leaves", ref => ref.orderByChild( "empId" ).equalTo( empId ) ).valueChanges();
      return this.firestore.list<Leave>( "employees/" + empId + "/Leaves" ).valueChanges();
    }
    return this.firestore.list<Leave>( "employees/" + empId + "/Leaves" ).valueChanges();
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

  private update(): void {

  }

  updateLeave( leave: Leave, leaveId: string ) {
    this.firestore.list<Leave>( "employees/" + leave.empId + "/Leaves" ).update( leaveId, leave );
  }

  removeLeave( leave: Leave ) {
    this.firestore.list<Leave>( "employees/" + leave.empId + "/Leaves" ).remove( leave.leaveId );
  }

  // @userId is used to check if you need timesheets for current employee
  fetchTimeSheets( empId?: string ) {
    if ( empId ) {
      // return this.firestore.list<TimeSheet>( "time-sheets", ref => ref.orderByChild( "empId" ).equalTo( empId ) ).valueChanges();
      return this.firestore.list<TimeSheet>( "employees/" + empId + "/TimeSheets" ).valueChanges();
    }
    return this.firestore.list<TimeSheet>( "employees/" + empId + "/TimeSheets" ).valueChanges();
  }

// Add new TimeSheet and add update the name to key
  addTimeSheet( sheet: TimeSheet ) {
    this.firestore.list<TimeSheet>( "employees/" + sheet.empId + "/TimeSheets" ).push( sheet ).then( value => {
      sheet.sheetId = value.key;
      this.updateTimeSheet( sheet, value.key );
    } );
  }

  updateTimeSheet( sheet: TimeSheet, sheetId: string ) {
    this.firestore.list<TimeSheet>( "employees/" + sheet.empId + "/TimeSheets" ).update( sheetId, sheet );
  }

  removeTimeSheet( sheet: TimeSheet ) {
    this.firestore.list<TimeSheet>( "employees/" + sheet.empId + "/TimeSheets" ).remove( sheet.sheetId );
  }

}
