import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TimeSheet } from "./model/time-sheet";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable( {
               providedIn: "root"
             } )
export class TimeSheetService {

  constructor( private http: HttpClient, private firestore: AngularFireDatabase ) { }

  // Fetch TimeSheets
  // @current and @userId is used to check if you need timesheets for current employee
  fetchTimeSheets( current: boolean, empId?: string ) {
    if ( current ) {
      return this.firestore.list<TimeSheet>( "time-sheets", ref => ref.orderByChild( "empId" ).equalTo( empId ) ).valueChanges();
    }
    return this.firestore.list<TimeSheet>( "time-sheets" ).valueChanges();
  }

  // Add new TimeSheet and add update the name to key
  addTimeSheet( sheet: TimeSheet ) {
    this.firestore.list<TimeSheet>( "time-sheets" ).push( sheet ).then( value => {
      sheet.sheetId = value.key;
      this.updateTimeSheet( sheet, value.key );
    } );
  }

  updateTimeSheet( sheet: TimeSheet, sheetId: string ) {
    this.firestore.list<TimeSheet>( "time-sheets" ).update( sheetId, sheet );
  }

  removeTimeSheet( sheetName: string ) {
    this.firestore.list<TimeSheet>( "time-sheets" ).remove( sheetName );
  }

}
