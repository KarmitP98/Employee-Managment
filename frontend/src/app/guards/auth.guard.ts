import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable( {
               providedIn: "root"
             } )
export class AuthGuard implements CanActivate, CanDeactivate<any> {

  constructor( private afa: AngularFireAuth,
               private router: Router ) {}


  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise( resolve => {
      this.afa.currentUser
          .then( () => resolve( true ) )
          .catch( () => resolve( this.router.navigateByUrl( "/login" ) ) );
    } );

  }

  canDeactivate( component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise( resolve => {
      this.afa.currentUser
          .then( () => resolve( false ) )
          .catch( () => true );
    } );
  }

}
