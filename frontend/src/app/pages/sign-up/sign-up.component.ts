import { Component, OnInit, ViewChild } from "@angular/core";
import { COMPANY_NAME, loadTrigger, MONTHS, STARTYEAR } from "../../shared/shared";
import { Employee } from "../../model/employee.model";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../../services/employee.service";

@Component( {
              selector: "app-sign-up",
              templateUrl: "./sign-up.component.html",
              styleUrls: [ "./sign-up.component.css" ],
              animations: [ loadTrigger ]
            } )
export class SignUpComponent implements OnInit {

  companyName = COMPANY_NAME;
  @ViewChild( "signUpForm", { static: false } ) signUpForm: NgForm;

  default_male_icon_url = "assets/default-pro-pic-male.png";
  default_female_icon_url = "assets/default-pro-pic-female.jpg";
  default_pro_pic = "assets/default-pro-pic.jpg";
  title = "Mr.";
  proPicUrl: string = this.default_pro_pic;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  DOB: Date;
  adminAccount: boolean;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {
  }

  onSignUp(): void {
    const date = this.signUpForm.value.DOB;
    let hpw: number[][] = [];
    let weeks = Array.from( Array( 52 ).keys() );
    hpw[new Date().getFullYear() - STARTYEAR] = [];
    for ( let i of weeks ) {
      hpw[new Date().getFullYear() - STARTYEAR][i] = 0;
    }

    // let map = new Map<number, { weeks: Map<number, number> }>();
    // let weekMap = new Map<number, number>();
    // weekMap.set( getWeekNumber( new Date() ), 0 );
    // map.set( new Date().getFullYear() - STARTYEAR, { weeks: weekMap } );
    //  console.log(map);
    const newEmp = new Employee( "temp", this.title, this.firstName + " " + (this.lastName === undefined ? "" : this.lastName), this.email,
                                 MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                                 this.proPicUrl, false, "Pending", this.password, 0, hpw );
    console.log( newEmp );
    this.employeeService.signUp( this.email, this.password, newEmp );
    this.signUpForm.resetForm();
  }
}
