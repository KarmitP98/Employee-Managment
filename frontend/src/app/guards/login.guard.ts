import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable( {
               providedIn: "root"
             } )
export class LoginGuard implements CanActivate {

  constructor( private afa: AngularFireAuth,
               private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise( resolve => {
      this.afa.currentUser
          .then( ( user ) => resolve( this.router.navigateByUrl( "/" + user.uid ) ) )
          .catch( () => resolve( true ) );
    } );

  }
}

