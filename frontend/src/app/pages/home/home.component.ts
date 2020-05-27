import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getWeekNumber, loadTrigger, STARTYEAR } from "../../shared/shared";
import { EmployeeService } from "../../shared/employee.service";
import { Employee } from "../../shared/model/employee.model";
import { MatDialog } from "@angular/material";
import { EmployeeDetailComponent } from "../admin/employee-card/employee-detail/employee-detail.component";

@Component( {
              selector: "app-home",
              templateUrl: "./home.component.html",
              styleUrls: [ "./home.component.css" ],
              animations: [ loadTrigger ]
            } )
export class HomeComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  employee: Employee;
  private sub: Subscription;
  today = new Date();

  dataSource = {
    chart: {
      lowerLimit: "0",
      upperLimit: "40",
      showValue: "1",
      numberSuffix: " Hrs",
      theme: "fusion",
      showToolTip: "1"
    },
    colorRange: {
      color: [ {
        minValue: "0",
        maxValue: "20",
        code: "#F2726F"
      }, {
        minValue: "20",
        maxValue: "30",
        code: "#FFC533"
      }, {
        minValue: "30",
        maxValue: "40",
        code: "#62B58F"
      } ]
    },
    dials: {
      dial: [ {
        value: 0
      } ]
    }
  };

  constructor( private employeeService: EmployeeService, private dialog: MatDialog ) { }

  ngOnInit() {
    this.sub = this.employeeService.employeeSubject.subscribe( value => {
      const isAuth = !!value;
      if ( isAuth ) {
        this.isAdmin = value.isAdmin;
        this.employee = value;
        this.dataSource.dials.dial[0].value = value.hoursPerWeek[this.today.getFullYear() - STARTYEAR][getWeekNumber( this.today )];
      } else {
        this.isAdmin = false;
      }
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDetails(): void {
    this.dialog.open( EmployeeDetailComponent, { data: this.employee } );
  }

}
