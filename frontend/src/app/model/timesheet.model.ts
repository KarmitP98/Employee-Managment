import Timestamp = firebase.firestore.Timestamp;
import * as firebase from "firebase";


export class Timesheet {

  public eId: string;
,
  public sheetId: string;
,
  public logDate: string;
,
  public startTime: string;
,
  public work: string;
,
  public status: string;
,
  public approved: boolean;
,
  public hours: number;
  public empName: string;

  eId: string;
  eName: string;
  sId: string;
  date: Timestamp;

}
