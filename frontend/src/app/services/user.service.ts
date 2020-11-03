import { Injectable } from "@angular/core";
import { UserModel } from "../model/models.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Injectable( {
               providedIn: "root"
             } )
export class UserService {

  private loadingSubject = new BehaviorSubject<boolean>( false );

  constructor( private afa: AngularFireAuth,
               private afs: AngularFirestore,
               private router: Router,
               private snackBar: MatSnackBar ) {}

  public loginWithEmailandPassword( email, password ) {

    this.loadingSubject.next( true );

    this.afa.signInWithEmailAndPassword( email, password )
        .then( ( value ) => {
          this.router.navigate( [ "/" + value.user.uid ] );
          this.loadingSubject.next( false );
        } )
        .catch( ( err ) => {
          this.showToast( err.message, 3000 );
          this.loadingSubject.next( false );
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
                uClass: "Member",
                uDOB: Timestamp.now(),
                leaves: [],
                requests: [],
                workLogIds: [],
                salary: 0
              } );
          }

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

  public updateUser( newUser: UserModel ): void {
    this.afs.collection( "users" )
        .doc( newUser.uId )
        .update( newUser );
  }

  public removeUser( user: UserModel ): void {

  }
}
