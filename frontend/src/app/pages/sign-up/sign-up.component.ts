import { Component, OnInit, ViewChild } from "@angular/core";
import { COMPANY_NAME, loadTrigger, MONTHS } from "../../shared/shared";
import { Employee } from "../../shared/model/employee.model";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../../shared/employee.service";

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
  title = "Mr.";
  proPicUrl: string = this.default_male_icon_url;
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
    const newEmp = new Employee( "temp", this.title, this.firstName + " " + (this.lastName === undefined ? "" : this.lastName), this.email,
                                 MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                                 this.proPicUrl, false, "Pending", this.password, 0 );
    console.log( newEmp );
    this.employeeService.signUp( this.email, this.password, newEmp );
    this.signUpForm.resetForm();
  }
}
