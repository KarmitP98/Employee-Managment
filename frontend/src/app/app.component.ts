import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component( {
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: [ './app.component.css' ]
            } )
export class AppComponent implements OnInit, OnDestroy {

  constructor( public themeService: ThemeService ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
