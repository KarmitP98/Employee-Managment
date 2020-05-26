export class TimeSheet {

  constructor( public empId: string,
               public sheetId: string,
               public logDate: string,
               public startTime: string,
               public work: string,
               public status: string,
               public approved: boolean,
               public hours: number ) {}

}
