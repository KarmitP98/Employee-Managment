import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LeaveModel } from "../model/models.model";


@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  constructor( private afs: AngularFirestore ) { }

  fetchLeave( child?, condition?, value? ) {
    if ( child ) {
      return this.afs.collection<LeaveModel>( "Leaves", ref => ref.where( child, condition, value ) );
    }
    return this.afs.collection<LeaveModel>( "Leaves" );

  }

  // Add new Leave and add update the name to key
  addLeave( Leave: LeaveModel ) {
    Leave.lId = this.afs.createId();
    this.afs.collection<LeaveModel>( "Leaves" )
        .doc( Leave.lId )
        .set( Leave );
  }

  updateLeave( Leave: LeaveModel ) {

    this.afs.collection<LeaveModel>( "Leaves" )
        .doc( Leave.lId )
        .update( Leave );
  }

  removeLeave( Leave: LeaveModel ) {
    this.afs.collection<LeaveModel>( "Leaves" )
        .doc( Leave.lId )
        .delete();
  }

}
