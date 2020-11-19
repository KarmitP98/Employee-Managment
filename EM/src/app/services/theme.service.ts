import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable( {
               providedIn: "root"
             } )
export class ThemeService {

  theme: BehaviorSubject<string> = new BehaviorSubject<string>( "" );

  constructor() {
  }

  changeTheme( s: string ): void {
    this.theme.next( s );
  }
}
