import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LeaveModel } from "../model/models.model";
import firebase from "firebase";
import { LoggerService } from "./logger.service";
import Timestamp = firebase.firestore.Timestamp;


@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  constructor( private afs: AngularFirestore,
               private loggerService: LoggerService ) { }

  fetchLeave( child?, condition?, value? ) {
    if ( child ) {
      return this.afs.collection<LeaveModel>( "leaves", ref => ref.where( child, condition, value ) );
    }
    return this.afs.collection<LeaveModel>( "leaves" );

  }

  // Add new Leave and add update the name to key
  addLeave( Leave: LeaveModel ) {
    this.loggerService.log( {
                              data: "User request to 'put' leave!",
                              time: Timestamp.now()
                            } );

    Leave.lId = this.afs.createId();
    this.afs.collection<LeaveModel>( "leaves" )
        .doc( Leave.lId )
        .set( Leave )
        .catch( reason => {
          this.loggerService.log( {
                                    data: reason.message,
                                    time: Timestamp.now(),
                                    error: reason.code
                                  } );
        } );
  }

  updateLeave( Leave: LeaveModel ) {
    this.loggerService.log( {
                              data: "User request to 'update' leave!",
                              time: Timestamp.now()
                            } );

    this.afs.collection<LeaveModel>( "leaves" )
        .doc( Leave.lId )
        .update( Leave )
        .catch( reason => {
          this.loggerService.log( {
                                    data: reason.message,
                                    time: Timestamp.now(),
                                    error: reason.code
                                  } );
        } );
  }

  removeLeave( Leave: LeaveModel ) {
    this.loggerService.log( {
                              data: "User request to 'remove' leave!",
                              time: Timestamp.now()
                            } );

    this.afs.collection<LeaveModel>( "leaves" )
        .doc( Leave.lId )
        .delete()
        .catch( reason => {
          this.loggerService.log( {
                                    data: reason.message,
                                    time: Timestamp.now(),
                                    error: reason.code
                                  } );
        } );
  }

}
