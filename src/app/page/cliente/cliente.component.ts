import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTable} from "@angular/material/table";
import {FormBuilder, Validators} from "@angular/forms";
import {ClienteService} from "./services/cliente.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ClienteModel} from "./model/cliente.model";
import {VERSION} from "@angular/cdk";
import {FormClienteComponent} from "./form-cliente/form-cliente.component";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;

  public lst: any[] = [];
  public columnas: string[] = ['numeracion', 'actions', 'nombres', 'apellidos', 'telefono', 'email', 'fechaCreacion'];
  totalElements: number = 0;
  page: number= 0;
  size: number= 12;
  tipoParametro!: ClienteModel;
  parametro: ClienteModel  = new ClienteModel();
  profesion:string='';
  version = VERSION;

  public loginForm = this.formBuilder.group({
    descripcion: ['',  Validators.required],
    tipoParametro: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder,
    private tipoParametroService: ClienteService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public datos:any
  ) { }



  ngOnInit(): void {
    this.inicializar();
  }

  inicializar() {
    this.tipoParametroService.inicializar({
      page: this.page,
      size: this.size,
      profesion: this.profesion
    }).subscribe((resp: any) => {
      this.lst = this.numeracion(resp.content);
      this.totalElements = resp.content.totalElements;
      console.log(this.lst);
    });
  }

  registrar(){
    const dialogRef = this.dialog.open(FormClienteComponent, {
      width: "40vw",
      disableClose:true,
      hasBackdrop:true,
      data: {accion: 'REGISTRAR', data: this.tipoParametro}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined){
        //this.notifier.notify('success', 'Registro exitoso!');
        this.inicializar();
      }
    });
  }

  openEdit(data: any) {

    console.log("pruebaa", data)

        const dialogRefEdit = this.dialog.open(FormClienteComponent, {
          width: "40vw",
          disableClose: true,
          hasBackdrop: true,
          data: {
            accion: 'EDITAR',
            data: data
          }
        });
        dialogRefEdit.afterClosed().subscribe(result => {
          if (result != undefined) {
            //this.notifier.notify('success', 'Actualización exitoso!');
            this.inicializar();
          }
        });

  }

  cambiarEstado(data:any){
    console.log(data)
    this.parametro.codigo = data.codigo;
    this.tipoParametroService.cambiarEstado(this.parametro).subscribe((response: any) => {
      console.log(response);
      if (response.estado) {
        this.inicializar();
        //this.notifier.notify('success', 'Cambios guardados exitosamente!');
      } else {
        //this.notifier.notify('error', 'Error al guardados cambios!');
      }
    });
  }


  private numeracion(midata: any | any[]) {
    for (let i = 0; i < midata.length; i++) {
      midata[i].numeracion = ((i + 1)+(this.page*this.size));
    }
    return midata;
  }

  nextPage(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.inicializar();
  }

}
