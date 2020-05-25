export class TimeSheet {

  constructor( public empId: string,
               public sheetId: string,
               public logDate: string,
               public startTime: Date,
               public endTime: Date,
               public work: string,
               public status: string,
               public approved: boolean,
               public hours: number ) {}

}
