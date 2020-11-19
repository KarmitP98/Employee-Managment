import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { WorkLogModel } from "../model/models.model";

@Injectable( {
               providedIn: "root"
             } )
export class WorklogService {

  constructor( private afs: AngularFirestore ) { }

  fetchWorkLog( child?, condition?, value? ) {
    if ( child ) {
      return this.afs.collection<WorkLogModel>( "worklogs", ref => ref.where( child, condition, value ) );
    }
    return this.afs.collection<WorkLogModel>( "worklogs" );

  }

  // Add new WorkLog and add update the name to key
  addWorkLog( workLog: WorkLogModel ) {
    workLog.wId = this.afs.createId();
    this.afs.collection<WorkLogModel>( "worklogs" )
        .doc( workLog.wId )
        .set( workLog );
  }

  updateWorkLog( workLog: WorkLogModel ) {

    this.afs.collection<WorkLogModel>( "worklogs" )
        .doc( workLog.wId )
        .update( workLog );
  }

  removeWorkLog( workLog: WorkLogModel ) {
    this.afs.collection<WorkLogModel>( "worklogs" )
        .doc( workLog.wId )
        .delete();
  }

}
