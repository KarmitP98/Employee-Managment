import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Employee } from "../../../shared/model/employee.model";
import { Subscription } from "rxjs";
import { MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";
import { loadTrigger } from "../../../shared/shared";
import { ADMIN_STATUS, EmployeeService } from "../../../shared/employee.service";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";

@Component( {
              selector: "app-admin-req",
              templateUrl: "./admin-req.component.html",
              styleUrls: [ "./admin-req.component.css" ],
              animations: [ loadTrigger ]
            } )
export class AdminReqComponent implements OnInit, OnDestroy {

  emps: Employee[] = [];
  curEmp: Employee;
  empId: string;
  empSub: Subscription;
  curEmpSub: Subscription;
  selectedReq: Employee;
  displayedColumns = [ "select", "empId", "empName", "empEmail", "DOB", "adminStatus" ];
  dataSource = new MatTableDataSource<Employee>( this.emps );
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  pageSize = 5;
  pageIndex = 0;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [ {} ], yAxes: [ {} ] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    },
    aspectRatio: 3
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "horizontalBar";
  public barChartLegend = true;
  public barChartPlugins = true;
  public barChartData: ChartDataSets[] = [
    { data: [], label: "Total Hours Worked" }
  ];
  public barChartColors = [
    {
      backgroundColor: [ "#ff0000", "#00ff00", "#0000ff" ]
    }
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "right"
    },
    plugins: {
      datalabels: {
        formatter: ( value, ctx ) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    },
    title: { text: "Hours Per Employee", display: true, position: "top", fontSize: 24 },
    aspectRatio: 3
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = true;
  public pieChartColors = [
    {
      backgroundColor: [ "#ff0000", "#00ff00", "#0000ff" ]
    }
  ];

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;

    this.curEmpSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.curEmp = value;
        this.empId = value.empId;

        this.empSub = this.employeeService.fetchEmployees().subscribe( value => {
          this.barChartLabels = [];
          this.barChartData[0].data = [];
          this.barChartLabels.push( ...value.map( value1 => {return value1.empName;} ) );
          this.barChartData[0].data.push( ...value.map( value1 => {return value1.totalHours;} ) );
          this.pieChartLabels = [];
          this.pieChartData = [];
          this.pieChartLabels.push( ...value.map( value1 => {return value1.empName;} ) );
          this.pieChartData.push( ...value.map( value1 => {return value1.totalHours;} ) );
          this.emps = value.filter( value1 => {
            return value1.empId !== this.curEmp.empId;
          } );
          this.loadValues();
        } );
      }
    } );

  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.curEmpSub.unsubscribe();
  }

  changeAdmin( response: boolean ): void {

    this.selectedReq.adminStatus = response ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.selectedReq.isAdmin = response;

    this.employeeService.updateEmployee( this.selectedReq, this.selectedReq.empId );
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<Employee>( this.emps.filter( ( value, index ) => {
      return (index >= this.pageIndex * this.pageSize && index <= (this.pageIndex * this.pageSize + this.pageSize - 1));
    } ) );
  }

  updateTable( $event: PageEvent ): void {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.loadValues();
  }

  // events
  listView: boolean = false;

  public chartClicked( { event, active }: { event: MouseEvent, active: {}[] } ): void {
    console.log( event, active );
  }

  public chartHovered( { event, active }: { event: MouseEvent, active: {}[] } ): void {
    console.log( event, active );
  }

  switchStyle(): void {
    this.listView = !this.listView;
  }
}
