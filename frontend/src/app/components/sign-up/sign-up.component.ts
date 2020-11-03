import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { loadTrigger } from "../../shared/animations";
import { COMPANY_NAME } from "../../shared/constants";

@Component( {
              selector: "app-sign-up",
              templateUrl: "./sign-up.component.html",
              styleUrls: [ "./sign-up.component.css" ],
              animations: [ loadTrigger ]
            } )
export class SignUpComponent implements OnInit {

  companyName = COMPANY_NAME;
  @ViewChild( "signUpForm" ) signUpForm: NgForm;

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

  constructor( private userService: UserService ) { }

  ngOnInit() {
  }

  onSignUp(): void {

  }
}
