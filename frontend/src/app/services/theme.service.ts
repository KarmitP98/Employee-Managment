import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable( {
               providedIn: 'root'
             } )
export class ThemeService {

  theme: BehaviorSubject<string>;

  constructor() {
    this.theme = new BehaviorSubject<string>( '' );
  }

  changeTheme( s: string ): void {
    console.log( 'here' );
    this.theme.next( s );
  }
}
