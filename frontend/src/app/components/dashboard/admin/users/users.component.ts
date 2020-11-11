import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../../../../services/user.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UserModel } from "../../../../model/models.model";
import { MatDialog } from "@angular/material/dialog";
import { EditUserComponent } from "./edit-user/edit-user.component";

@Component( {
              selector: "app-users",
              templateUrl: "./users.component.html",
              styleUrls: [ "./users.component.css" ]
            } )
export class UsersComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  users: UserModel[] = [];

  constructor( private userService: UserService,
               private route: ActivatedRoute,
               private dialog: MatDialog ) { }

  ngOnInit(): void {
    const uId = this.route.snapshot.parent.parent.params["uId"];

    this.userSub = this.userService.fetchUser( "uId", "!=", uId )
                       .valueChanges()
                       .subscribe( value => {
                         if ( value?.length > 0 ) {
                           this.users = value;
                         }
                       } );

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  openDialog( user: UserModel ): void {
    const dialogRef = this.dialog.open( EditUserComponent, {
      closeOnNavigation: true,
      position: null,
      hasBackdrop: false,
      role:  "dialog",
      width: "20%",
      data: user
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( result ) {
        this.userService.updateUser( result );
      }
    } );
  }

}
