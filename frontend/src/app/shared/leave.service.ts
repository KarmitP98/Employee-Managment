import { Injectable } from "@angular/core";
import { Leave } from "./model/leaves.model";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "@angular/fire/database";

export const EXT = ".json";

@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  constructor( private http: HttpClient, private firestore: AngularFireDatabase ) { }

  fetchLeaves( current: boolean, empId?: string ) {
    if ( current ) {
      return this.firestore.list<Leave>( "leaves", ref => ref.orderByChild( "empId" ).equalTo( empId ) ).valueChanges();
    }
    return this.firestore.list<Leave>( "leaves" ).valueChanges();
  }

  addLeave( leave: Leave ) {
    this.firestore.list<Leave>( "leaves" ).push( leave ).then( value => {
      leave.leaveId = value.key;
      this.updateLeave( leave, value.key );
    } );
  }

  updateLeave( leave: Leave, leaveId: string ) {
    this.firestore.list<Leave>( "leaves" ).set( leaveId, leave );
  }

  removeLeave( leaveId: string ) {
    this.firestore.list<Leave>( "leaves" ).remove( leaveId );
  }

}
