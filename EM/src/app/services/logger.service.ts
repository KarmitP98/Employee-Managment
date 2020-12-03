import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActionModel, LogModel } from "../model/models.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable( {
               providedIn: "root"
             } )
// @ts-ignore
export class LoggerService {

  private error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );

  constructor( private afs: AngularFirestore,
               private snackBar: MatSnackBar ) { }

  public log( log: LogModel ) {
    this.afs.collection<LogModel>( "logs" )
        .add( log );
  }

  public fetchLogs() {
    return this.afs.collection<LogModel>( "logs" )
               .valueChanges();
  }

  public actionStarted( action?: ActionModel ) {
    this.error.next( true );

    setTimeout( () => {
      if ( this.error.getValue() ) {
        // this.log( action );
        this.showToast( action.to.toUpperCase() + " DOES NOT EXIST!!!" );
        this.error.next( false );
      } else {
        this.showToast( "Page loaded successfully!!!" );
      }
    }, 1000 );
  }

  public actionCompleted() {
    this.error.next( false );
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
}
