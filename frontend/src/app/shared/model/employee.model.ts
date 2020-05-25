export class Employee {

  constructor( public empId: string,
               public abv: string,
               public empName: string,
               public empEmail: string,
               public isAdmin: boolean,
               public adminStatus: string,
               public password: string,
               public totalHours?: number ) {}

}
