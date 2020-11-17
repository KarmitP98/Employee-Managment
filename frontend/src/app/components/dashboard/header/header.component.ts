import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { COMPANY_NAME, theme } from '../../../shared/constants';
import { UserModel } from '../../../model/models.model';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemeService } from '../../../services/theme.service';

@Component( {
              selector: 'app-header',
              templateUrl: './header.component.html',
              styleUrls: [ './header.component.css' ]
            } )
export class HeaderComponent implements OnInit, OnDestroy {

  companyName = COMPANY_NAME;
  user: UserModel;
  userSub: Subscription;

  themes: theme[] = [
    { name: 'Default', class: '' },
    { name: 'Classic', class: 'classic-theme' },
    { name: 'Dark', class: 'dark-theme' },
    { name: 'RGB', class: 'rgb-theme' },
    { name: 'BYG', class: 'byg-theme' },
    { name: 'Charleston', class: 'charleston-theme' }
  ];

  spinners = [
    { color: 'primary' },
    { color: 'accent' },
    { color: 'warn' }
  ];

  mode: ProgressSpinnerMode = 'determinate';
  diameter = 20;
  value = 100;

  constructor( private userService: UserService,
               private route: ActivatedRoute,
               private dialog: MatDialog,
               public themeService: ThemeService ) {

  }

  ngOnInit() {
    const uId = this.route.snapshot.params['uId'];
    this.userSub = this.userService.fetchUser( 'uId', '==', uId )
                       .valueChanges( untilDestroyed( this ) )
                       .pipe()
                       .subscribe( value => {
                         if ( value?.length > 0 ) {
                           this.user = value[0];
                         }
                       } );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open( ProfileComponent, {
      position: null,
      hasBackdrop: true,
      role: 'dialog',
      data: this.user.uId
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( result ) {
        this.userService.updateUser( result );
      }
    } );
  }

  logOut(): void {
    this.userService.logOut();
  }

  changeTheme( name: string ): void {
    this.themeService.changeTheme( name );
  }
}
