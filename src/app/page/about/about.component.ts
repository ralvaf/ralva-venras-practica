import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ClienteService} from "../cliente/services/cliente.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  //single = [];
  view: [number, number] = [900, 700];

  public lst: any[] = [];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;


  constructor(
    private tipoParametroService: ClienteService
  ) {
    this.tipoParametroService.inicializar({}).subscribe((resp: any) => {
      this.lst = resp.content;
      this.single = [];
      for (let i = 0; i < this.lst.length; i++) {
        // @ts-ignore
        this.single.push({'name': this.lst[i].nombre, 'value':20+i})

        console.log("array :::::::::::", this.single)
      }
      console.log(this.lst);
    });
    //this.inicializar();
  }


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "UK",
      "value": 6200000
    }
  ];


  /*inicializar() {
    this.tipoParametroService.inicializar({}).subscribe((resp: any) => {
      this.lst = resp.content;

      for (let i = 0; i < this.lst.length; i++) {
        // @ts-ignore
        this.single.push({'name': this.lst[i].nombre, 'value':20+i})

        console.log("array :::::::::::", this.single)
      }
      console.log(this.lst);
    });
  }*/

  onSelect(data: any): any {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): any {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): any {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }





}


