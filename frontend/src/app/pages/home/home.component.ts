import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../../shared/data-storage.service";
import { Subscription } from "rxjs";
import { loadTrigger } from "../../shared/shared";

@Component( {
              selector: "app-home",
              templateUrl: "./home.component.html",
              styleUrls: [ "./home.component.css" ],
              animations: [ loadTrigger ]
            } )
export class HomeComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private sub: Subscription;

  constructor( private dataStorageService: DataStorageService ) { }

  ngOnInit() {
    this.sub = this.dataStorageService.employeeSubject.subscribe( value => {
      const isAuth = !!value;
      if ( isAuth ) {
        this.isAdmin = value.isAdmin;
      } else {
        this.isAdmin = false;
      }
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
