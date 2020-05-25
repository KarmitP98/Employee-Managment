import { Component, OnInit, ViewChild } from "@angular/core";
import { COMPANY_NAME, loadTrigger } from "../../shared/shared";
import { DataStorageService } from "../../shared/data-storage.service";
import { Employee } from "../../shared/model/employee.model";
import { NgForm } from "@angular/forms";

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

  constructor( private dataStorageService: DataStorageService ) { }

  ngOnInit() {
  }

  onSignUp(): void {
    const newEmp = new Employee( "temp", this.title, this.firstName + " " + this.lastName, this.email, this.DOB,
                                 this.proPicUrl, false, "Pending", this.password, 0, [], [] );
    console.log( newEmp );
    this.dataStorageService.signUp( this.email, this.password, newEmp );
    this.signUpForm.reset();
  }
}
