import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export class UserModel {


  uId: string;
  uAbv: string;
  uName: string;
  uEmail: string;
  uDOB: Timestamp;
  uProPic: string;
  uLevel: number;
  requests: RequestModel[];
  workLogIds: WorkLogModel[];
  leaves: LeaveModel[];
  salary?: number;

  constructor( other: UserModel ) {
    this.uId = other.uId;
    this.uAbv = other.uAbv;
    this.uName = other.uName;
    this.uEmail = other.uEmail;
    this.uDOB = other.uDOB;
    this.uProPic = other.uProPic;
    this.uLevel = other.uLevel;
    this.requests = other.requests;
    this.workLogIds = other.workLogIds;
    this.leaves = other.leaves;
    this.salary = other.salary;
  }
}

export class WorkLogModel {
  uId: string;
  wId: string;
  weekNum: number;
  weeklyBilledHours: number;
  weeklyUnBilledHours: number;
  sheets: TimesheetModel[];
}

export class TimesheetModel {
  date: Timestamp;
  startTime: Timestamp;
  endTime: Timestamp;
  task: number;
  status: string;
  approved: boolean;
  billedHours: number;
  unbilledHours: number;
}

export class LeaveModel {
  uId: string;
  lId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  type: string;
  reason: string;
  status: string;
  approved: boolean;
  uName: string;
}

export class RequestModel {
  by: string;
  rId: string;
  rType: string;
  rStatus: string;
}

export class ActionModel {
  from: string;
  to: string;
  date: Timestamp;
}
