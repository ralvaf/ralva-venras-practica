import { Component, EventEmitter, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {map, Observable, shareReplay} from "rxjs";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  propagar = new EventEmitter<string>();


  public loading!: boolean;
  public isAuthenticated!: boolean;
  public title!: string;

  public isBypass!: boolean;
  public mobile!: boolean;
  public isMenuInitOpen!: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }


  private sidenav!: MatSidenav;

  public isMenuOpen = true;
  public contentMargin = 240;

  get isHandset(): boolean {
    //return this.breakpointObserver.isMatched('(max-width: 720px)');
    //return this.breakpointObserver.isMatched('(max-width: 960px)');
    return this.breakpointObserver.isMatched('(max-width: 1280px)');
  }

  //isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 720px)')
  //isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 960px)')
  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1280px)')
    .pipe(
      map(result => result.matches),
      shareReplay(1),
    );

  // *********************************************************************************************
  // * LIFE CYCLE EVENT FUNCTIONS
  // *********************************************************************************************


  ngOnInit() {
    this.isMenuOpen = true;  // Open side menu by default
    this.title = 'Sistema ventas - ALVA FLORES ROOSBELTH EUFRAIN';
  }

  ngDoCheck() {
    if (this.isHandset) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }

  // *********************************************************************************************
  // * COMPONENT FUNCTIONS
  // *********************************************************************************************

  public openSnackBar(msg: string): void {
    this._snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'notif-error'
    });
  }

  public onSelectOption(option: any): void {
    const msg = `Chose option ${option}`;
    this.openSnackBar(msg);

    /* To route to another page from here */
    // this.router.navigate(['/home']);
  }


  clicked: boolean = false;

  Clicked() {
    this.clicked = true;
  }

  procesaPropagar(mensaje:string) {
    console.log(mensaje);
  }

  menu1: any [] = [
    {
      displayName: 'Clientes',
      iconName: 'desktop_windows',
      route: '/',
    },
    {
      displayName: 'Grafico de PIE',
      iconName: 'desktop_windows',
      route: '/about',
    }
  ];

}
