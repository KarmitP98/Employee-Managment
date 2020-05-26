export class Employee {

  constructor( public empId: string,
               public abv: string,
               public empName: string,
               public empEmail: string,
               public DOB: Date,
               public profilePicURL: string,
               public isAdmin: boolean,
               public adminStatus: string,
               public password: string,
               public totalHours?: number ) {}

}
