export class Leave {

  constructor( public empId: string,
               public leaveId: string,
               public startDate: string,
               public endDate: string,
               public reason: string,
               public status: string,
               public approved: boolean ) {}

}
