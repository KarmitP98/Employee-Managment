import { Component, Input, OnInit } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { spinners, themes } from "../../shared/constants";

@Component( {
              selector: "app-theme-changer",
              templateUrl: "./theme-changer.component.html",
              styleUrls: [ "./theme-changer.component.scss" ]
            } )
export class ThemeChangerComponent implements OnInit {

  spinners = spinners;
  themes = themes;

  mode: ProgressSpinnerMode = "determinate";
  diameter = 20;
  value = 100;

  @Input( "xPos" ) xPos?;
  @Input( "yPos" ) yPos?;

  constructor( public themeService: ThemeService ) { }

  ngOnInit(): void {
  }


}
