import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable( {
               providedIn: "root"
             } )
export class StatService {

  constructor( private firestore: AngularFireDatabase ) { }

  fetchStats() {
    return this.firestore.object<any>( "stats" ).valueChanges();
  }

  addStats( item: string, value: number | string | Date | boolean ) {
    this.firestore.object( "stats/" + item ).set( value );
  }

  updateStats( item: string, value: number | string | Date | boolean ) {
    this.firestore.object( "stats/" + item ).update( value );
  }

  removeStats( item?: string ) {
    if ( item ) {
      this.firestore.object( "stats/" + item ).remove();
    } else {
      this.firestore.list( "stats" ).remove();
    }
  }

}
