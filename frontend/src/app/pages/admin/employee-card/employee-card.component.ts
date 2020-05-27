import { Component, Input, OnInit } from "@angular/core";
import { Employee } from "../../../shared/model/employee.model";
import { ADMIN_STATUS, EmployeeService } from "../../../shared/employee.service";
import { MatDialog, MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";

@Component( {
              selector: "app-employee-card",
              templateUrl: "./employee-card.component.html",
              styleUrls: [ "./employee-card.component.css" ]
            } )
export class EmployeeCardComponent implements OnInit {
  @Input() emp: Employee;

  constructor( private employeeService: EmployeeService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dialog: MatDialog ) {

    iconRegistry.addSvgIcon(
      "thumbs-up",
      sanitizer.bypassSecurityTrustResourceUrl( "frontend/src/assets/thumb_up_black_18dp.svg" ) );

    iconRegistry.addSvgIcon(
      "thumbs-down",
      sanitizer.bypassSecurityTrustResourceUrl( "frontend/src/assets/thumb_down_black_18dp.svg" ) );

    iconRegistry.addSvgIcon(
      "details",
      sanitizer.bypassSecurityTrustResourceUrl( "frontend/src/assets/loupe-black-18dp.svg" ) );
  }

  ngOnInit() {
  }

  updateAdmin( b: boolean ): void {
    this.emp.isAdmin = b;
    this.emp.adminStatus = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.employeeService.updateEmployee( this.emp, this.emp.empId );
  }

  openDetails(): void {
    console.log( "Details Clicked!" );
    this.dialog.open( EmployeeDetailComponent, { data: this.emp } );
  }
}
