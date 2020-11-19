import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable( {
               providedIn: "root"
             } )
export class LogoService {

  constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ) {

    iconRegistry.addSvgIcon(
      "logo-google",
      sanitizer.bypassSecurityTrustResourceUrl( "../../assets/logos/logo-google.svg" ) );
    iconRegistry.addSvgIcon(
      "logo-facebook",
      sanitizer.bypassSecurityTrustResourceUrl( "../../assets/logos/logo-facebook.svg" ) );
    iconRegistry.addSvgIcon(
      "logo-github",
      sanitizer.bypassSecurityTrustResourceUrl( "../../assets/logos/logo-github.svg" ) );
    iconRegistry.addSvgIcon(
      "calendar-clear",
      sanitizer.bypassSecurityTrustResourceUrl( "../../assets/logos/calendar-clear.svg" ) );
  }
}
