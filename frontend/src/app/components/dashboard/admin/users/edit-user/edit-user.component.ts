import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserModel } from "../../../../../model/models.model";

@Component( {
              selector: "app-edit-user",
              templateUrl: "./edit-user.component.html",
              styleUrls: [ "./edit-user.component.css" ]
            } )
export class EditUserComponent implements OnInit {

  constructor( private dialog: MatDialog,
               private dialogRef: MatDialogRef<any> ,
               @Inject(MAT_DIALOG_DATA) public data: UserModel) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
