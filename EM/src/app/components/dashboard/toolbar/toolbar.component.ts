import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { Subscription } from "rxjs";
import { COMPANY_NAME } from "../../../shared/constants";
import { UserModel } from "../../../model/models.model";
import { ProfileComponent } from "../profile/profile.component";
import firebase from "firebase";
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
               private route: ActivatedRoute,
               private dialog: MatDialog ) {
  }

  ngOnInit() {
    const uId = this.route.snapshot.params["uId"];
    this.userSub = this.userService.fetchUser( "uId", "==", uId )
                       .valueChanges()
                       .subscribe( value => {
                         if ( value?.length > 0 ) {
                           this.user = value[0];
                         }
                       } );
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
    this.userService.pageLoadingStarted( { date: Timestamp.now(), from: "Somewhere", to } );
  }

  logOut(): void {
    this.userService.logOut();
  }

}
