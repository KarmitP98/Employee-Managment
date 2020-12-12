import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import firebase from "firebase";
import { ActionModel, UserModel } from "../model/models.model";
import { LoggerService } from "./logger.service";
import Timestamp = firebase.firestore.Timestamp;

@Injectable( {
               providedIn: "root"
             } )
export class UserService {

  private loadingSubject = new BehaviorSubject<boolean>( false );

  constructor( private afa: AngularFireAuth,
               private afs: AngularFirestore,
               private router: Router,
               private snackBar: MatSnackBar,
               private loggerService: LoggerService ) {}

  public loginWithEmailandPassword( email, password ) {

    this.loadingSubject.next( true );
    this.afa.signInWithEmailAndPassword( email, password )
        .then( ( value ) => {

          // Start Error checking
          this.loggerService.actionStarted( { date: Timestamp.now(), from: "Login", to: "Home" } );

          // Check if the routes has the route we need
          // if ( routes.some( route => route.component === DashboardComponent ) ) {
          this.router.navigate( [ "/" + value.user.uid ] );
          // }
          this.loadingSubject.next( false );
        } )
        .catch( ( err ) => {
          this.showToast( err.message, 3000 );
        } );
  }

  public loginWithProvider( provider: string ) {
    var pro: any;
    switch ( provider ) {
      case "google":
        // @ts-ignore
        pro = new firebase.auth.GoogleAuthProvider();
        break;
      case "github":
        // @ts-ignore
        pro = new firebase.auth.GithubAuthProvider();
        break;
      case "facebook":
        // @ts-ignore
        pro = new firebase.auth.FacebookAuthProvider();
        break;
      default:
        // @ts-ignore
        pro = new firebase.auth.EmailAuthProvider();
    }

    this.afa.signInWithPopup( pro )
        .then( value => {

          if ( value.additionalUserInfo.isNewUser ) {
            this.addNewUser(
              {
                uId: value.user.uid,
                uName: value.user.displayName,
                uEmail: value.user.email,
                uProPic: value.user.photoURL,
                uAbv: "-",
                uLevel: 1,
                uDOB: Timestamp.now(),
                leaves: [],
                requests: [],
                workLogIds: [],
                salary: 0
              } );
          }
          var string = "Login: " + JSON.stringify( Timestamp.now().toDate() );
          this.afs.collection( "log" ).add( { string } );
          this.router.navigate( [ "/" + value.user.uid ] );
          this.loadingSubject.next( false );

        } )
        .catch( reason => {
          console.log( reason.errorCode );
          console.log( reason.message );
        } );

  }

  public signUpWithEmail( user: UserModel, password: string ) {

    this.loadingSubject.next( true );

    this.afa.createUserWithEmailAndPassword( user.uEmail, password )
        .then( ( value ) => {
          user.uId = value.user.uid;
          this.addNewUser( user );

          this.router.navigate( [ "/" + value.user.uid ] );
          this.loadingSubject.next( false );
        } )
        .catch( ( err ) => {
          this.showToast( err.message, 3000 );
          this.loadingSubject.next( false );
        } );

  }

  public logOut() {
    this.afa.signOut()
        .then( () => {
          this.router.navigate( [ "" ] );
        } )
        .catch( err => {
          console.log( err.message );
          console.log( err.errorCode );
          this.loggerService.log( { data: "User cannot sign out!", time: Timestamp.now(), error: "Auth Service Un-responsive" } );
        } );
  }

  public showToast( message, time? ) {
    this.snackBar.open( message,
                        "Close",
                        {
                          duration: time || 2000,
                          horizontalPosition: "center",
                          verticalPosition: "bottom",
                          politeness: "assertive"
                        } );
  }

  public addNewUser( user: UserModel ): void {
    this.afs.collection( "users" )
        .doc( user.uId )
        .set( user );
  }

  public fetchUser( child?, condition?, value? ) {
    if ( child ) {
      return this.afs.collection<UserModel>( "users", ref => ref.where( child, condition, value ) );
    }
    return this.afs.collection<UserModel>( "users" );
  }

  public updateUser( newUser: UserModel ): void {
    this.afs.collection( "users" )
        .doc( newUser.uId )
        .update( newUser );
  }

  public removeUser( user: UserModel ): void {
    this.afs.collection( "users" )
        .doc( user.uId )
        .delete();
  }

  public pageLoadingStarted( action: ActionModel ) {
    this.loggerService.actionStarted( action );
  }

  public pageLoaded() {
    // Clear Error
    this.loggerService.actionCompleted();
  }

}
