import { Component, Inject, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserModel } from "../../../model/models.model";
import { EditUserComponent } from "../admin/users/edit-user/edit-user.component";

@Component( {
              selector: "app-profile",
              templateUrl: "./profile.component.html",
              styleUrls: [ "./profile.component.css" ]
            } )
export class ProfileComponent implements OnInit {

  sub: any;
  user: UserModel;

  constructor( public userService: UserService,
               @Inject( MAT_DIALOG_DATA ) public uId: string,
               private dialog: MatDialog,
               private dialogRef: MatDialogRef<any> ) {

    this.sub = this.userService.fetchUser( "uId", "==", this.uId )
                   .valueChanges()
                   .subscribe( value => {
                     if ( value?.length > 0 ) {
                       this.user = value[0];
                     }
                   } );

  }

  ngOnInit(): void {
  }

  getUserType(): string {
    return this.user.uLevel === 1 ? "Employee" : this.user.uLevel === 2 ? "Employer" : "Admin";
  }

  closeDialogue(): void {
    this.dialogRef.close();
  }

  editDialogue(): void {
    const dialogRef = this.dialog.open( EditUserComponent, {
      position: null,
      hasBackdrop: true,
      role: "dialog",
      width: "20%",
      data: this.user.uId
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( result ) {
        this.userService.updateUser( result );
      }
    } );
  }


}
