import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable( {
               providedIn: "root"
             } )
export class LogService {

  constructor( private afs: AngularFirestore ) { }

  public log( log ) {
    this.afs.collection( "logs" )
        .doc( "1" )
        .set( log );
  }
}
