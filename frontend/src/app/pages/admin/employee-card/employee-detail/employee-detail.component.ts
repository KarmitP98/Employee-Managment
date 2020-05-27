import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Employee } from "../../../../shared/model/employee.model";
import { TimeSheetService } from "../../../../shared/time-sheet.service";
import { Timesheet } from "../../../../shared/model/timesheet.model";
import { Subscription } from "rxjs";

@Component( {
              selector: "app-employee-detail",
              templateUrl: "./employee-detail.component.html",
              styleUrls: [ "./employee-detail.component.css" ]
            } )
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  timeSheets: Timesheet[];
  sheetSub: Subscription;
  dataSource = {
    chart: {
      caption: "Time-sheet Log",
      xAxisName: "Dates",
      yAxisName: "Hours (hh)",
      numberSuffix: "Hrs",
      theme: "fusion"
    },
    data: []
  };
  chartConfig = {
    width: "600",
    height: "325",
    type: "column2d",
    dataFormat: "json"
  };

  constructor( @Inject( MAT_DIALOG_DATA ) public emp: Employee, private timeSheetService: TimeSheetService ) { }

  ngOnInit() {


    this.sheetSub = this.timeSheetService.fetchTimeSheets( "empId", this.emp.empId ).subscribe( value => {
      if ( value ) {
        this.dataSource.data = [];
        for ( const v of value ) {
          this.dataSource.data.push( { value: v.hours + "", label: v.logDate } );
        }
      }
    } );

  }

  ngOnDestroy(): void {
    this.sheetSub.unsubscribe();
  }

}
