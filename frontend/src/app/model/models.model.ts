import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export class UserModel {
  uId: string;
  uAbv: string;
  uName: string;
  uEmail: string;
  uDOB: Timestamp;
  uProPic: string;
  uClass: string;
  requests: RequestModel[];
  workLogIds: WorkLogModel[];
  leaves: LeaveModel[];
  salary?: number;
}

export class WorkLogModel {
  uId: string;
  wId: string;
  weekNum: number;
  weeklyBilledHours: number;
  weeklyUnBilledHours: number;
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
  startDate: string;
  endDate: string;
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
