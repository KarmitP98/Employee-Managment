import { TimeSheet } from "./time-sheet";
import { Leave } from "./leaves.model";

export class Employee {

  constructor( public empId: string,
               public abv: string,
               public empName: string,
               public empEmail: string,
               public DOB: Date,
               public profilePicUrl: string,
               public isAdmin: boolean,
               public adminStatus: string,
               public password: string,
               public totalHours: number,
               public TimeSheets: TimeSheet[],
               public Leaves: Leave[] ) {}

}
