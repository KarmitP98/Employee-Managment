import { Injectable } from "@angular/core";
import { Leave } from "./model/leaves.model";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "@angular/fire/database";


@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  constructor( private http: HttpClient, private firestore: AngularFireDatabase ) { }

  fetchLeaves( current: boolean, empId?: string ) {
    if ( current ) {
      // return this.firestore.list<Leave>( "leaves", ref => ref.orderByChild( "empId" ).equalTo( empId ) ).valueChanges();
      return this.firestore.list<Leave>( "employees/" + empId + "/Leaves" ).valueChanges();
    }
    return this.firestore.list<Leave>( "leaves" ).valueChanges();
  }



}
