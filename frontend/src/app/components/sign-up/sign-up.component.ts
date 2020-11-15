import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { loadTrigger } from "../../shared/animations";
import { COMPANY_NAME } from "../../shared/constants";
import firebase from "firebase";
import { AngularFireStorage } from "@angular/fire/storage";
import Timestamp = firebase.firestore.Timestamp;

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
  abv = "Mr.";
  proPicUrl: string = this.default_pro_pic;

  email: string;
  password: string;
  DOB: Timestamp;
  adminAccount: boolean;
  uName: string;
  public selectedFile: File;

  constructor( private userService: UserService,
               private afst: AngularFireStorage ) { }

  ngOnInit() {
  }

  onSignUp(): void {
    this.userService.signUpWithEmail( {
                                        uId: "temp",
                                        uDOB: this.DOB,
                                        uLevel: this.adminAccount ? 2 : 1,
                                        uAbv: this.abv,
                                        uProPic: this.proPicUrl,
                                        uName: this.uName,
                                        uEmail: this.email,
                                        salary: 11,
                                        workLogIds: [],
                                        requests: [],
                                        leaves: []
                                      }, this.password );
  }

  selectProfilePic( $event: Event ) {
    console.log( $event );
    var file: File = this.selectedFile;
    console.log( file );

  }

}
