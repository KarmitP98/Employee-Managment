import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "@angular/fire/database";
import { Leave } from "../model/leaves.model";


@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  constructor( private http: HttpClient, private firestore: AngularFireDatabase ) { }

  fetchLeaves( child?: string, value?: string | number | boolean ) {
    if ( child ) {
      return this.firestore.list<Leave>( "leaves", ref => ref.orderByChild( child ).equalTo( value ) ).valueChanges();
    }
    return this.firestore.list<Leave>( "leaves" ).valueChanges();
  }

  fetchRangeOfLeaves( startAt: number, limit: number ) {
    return this.firestore.list<Leave>( "leaves", ref => ref.startAt( startAt ).limitToFirst( limit ) ).valueChanges();
  }

  // Add new TimeSheet and add update the name to key
  addLeave( leave: Leave ) {
    this.firestore.list<Leave>( "leaves" ).push( leave ).then( value => {
      leave.leaveId = value.key;
      this.updateLeave( leave, value.key );
    } );
  }

  updateLeave( leave: Leave, leaveId: string ) {
    this.firestore.list<Leave>( "leaves" ).update( leaveId, leave );
  }

  removeLeave( leave: Leave ) {
    this.firestore.list<Leave>( "leaves" ).remove( leave.leaveId );
  }

}
