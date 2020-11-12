import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserModel } from "../../../../../model/models.model";
import { UserService } from "../../../../../services/user.service";

@Component( {
              selector: "app-edit-user",
              templateUrl: "./edit-user.component.html",
              styleUrls: [ "./edit-user.component.css" ]
            } )
export class EditUserComponent implements OnInit, OnDestroy {

  public userSub: any;
  public user: UserModel;

  constructor( private dialog: MatDialog,
               private dialogRef: MatDialogRef<any>,
               @Inject( MAT_DIALOG_DATA ) public data: string,
               private userService: UserService ) {

  }

  ngOnInit(): void {

    this.userSub = this.userService.fetchUser( "uId", "==", this.data )
                       .valueChanges()
                       .subscribe( value => {
                         if ( value?.length > 0 ) {this.user = value[0];}
                       } );

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
