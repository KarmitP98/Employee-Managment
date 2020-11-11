import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable( {
               providedIn: "root"
             } )
export class RequestService {

  constructor( private afs: AngularFirestore ) { }

  public fetchRequests( type?, child?, condition?, value?, valueType? ) {
    if ( child ) {
      if ( type ) {
        return this.afs.collection( "requests", ref => ref.where( child, condition, value ).where( type, "==", valueType ) );
      }
      return this.afs.collection( "requests", ref => ref.where( child, condition, value ) );
    }
    return this.afs.collection( "requests" );
  }

  public removeRequest(request)
  {

  }

}
