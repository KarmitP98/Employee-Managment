import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { Subscription } from "rxjs";
import { COMPANY_NAME } from "../../../shared/constants";
import { UserModel } from "../../../model/models.model";
import { ProfileComponent } from "../profile/profile.component";
import firebase from "firebase";
import { LoggerService } from "../../../services/logger.service";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
              selector: "app-toolbar",
              templateUrl: "./toolbar.component.html",
              styleUrls: [ "./toolbar.component.scss" ]
            } )
export class ToolbarComponent implements OnInit, OnDestroy {


  companyName = COMPANY_NAME;
  user: UserModel;
  userSub: Subscription;
  selected: string;

  constructor( private userService: UserService,
               public loggerService: LoggerService,
               private route: ActivatedRoute,
               private dialog: MatDialog,
               public router: Router ) {
  }

  ngOnInit() {
    const uId = this.route.snapshot.params["uId"];
    this.loggerService.log( {
                              data: "User data request. ID: " + uId,
                              time: Timestamp.now()
                            } );

    this.userSub = this.userService.fetchUser( "uId", "==", uId )
                       .valueChanges()
                       .subscribe( value => {
                         if ( value?.length > 0 ) {
                           this.user = value[0];
                         } else {
                           this.loggerService.log( {
                                                     data: "No data returned!",
                                                     time: Timestamp.now(),
                                                     error: "Database Timeout!"
                                                   } );
                         }
                       } );


    this.loggerService.log( { data: "Toolbar Loaded!", time: Timestamp.now() } );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open( ProfileComponent, {
      position: null,
      hasBackdrop: true,
      role: "dialog",
      data: this.user.uId
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( result ) {
        this.userService.updateUser( result );
      }
    } );
  }

  pageClicked( to: string ) {

    this.router.navigate( [ to ], { relativeTo: this.route } )
      // .then( () => {this.loggerService.log( { time: Timestamp.now(), data: to.toUpperCase() + " page loaded!" } );} )
        .catch( ( err ) => {
          console.log( err );
          this.loggerService.log( { time: Timestamp.now(), data: to.toUpperCase() + " page does not exist!", error: "Error404" } );
        } );

    // this.userService.pageLoadingStarted( { date: Timestamp.now(), from: "Somewhere", to } );
  }

  logOut(): void {
    this.userService.logOut();
  }

}
