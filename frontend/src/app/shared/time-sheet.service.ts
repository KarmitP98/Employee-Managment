import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "@angular/fire/database";
import { Timesheet } from "./model/timesheet.model";

@Injectable( {
               providedIn: "root"
             } )
export class TimeSheetService {

  constructor( private http: HttpClient, private firestore: AngularFireDatabase ) { }

  fetchTimeSheets( child?: string, value?: string | number | boolean ) {
    if ( child ) {
      return this.firestore.list<Timesheet>( "time-sheets", ref => ref.orderByChild( child ).equalTo( value ) ).valueChanges();
    }
    return this.firestore.list<Timesheet>( "time-sheets" ).valueChanges();

  }

  fetchRangeOfTimeSheets( startAt: string, limit: number ) {
    return this.firestore.list<Timesheet>( "time-sheets", ref => ref.orderByChild( "sheetId" ).startAt( startAt ).limitToFirst( limit ) )
               .valueChanges();
  }

  // Add new TimeSheet and add update the name to key
  addTimeSheet( sheet: Timesheet ) {
    this.firestore.list<Timesheet>( "time-sheets" ).push( sheet ).then( value => {
      sheet.sheetId = value.key;
      this.updateTimeSheet( sheet, value.key );
    } );
  }

  updateTimeSheet( sheet: Timesheet, sheetId: string ) {
    this.firestore.list<Timesheet>( "time-sheets" ).update( sheetId, sheet );
  }

  removeTimeSheet( sheet: Timesheet ) {
    this.firestore.list<Timesheet>( "time-sheets" ).remove( sheet.sheetId );
  }

}
