import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClienteModel} from "../model/cliente.model";
import {ClienteService} from "../services/cliente.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

// @ts-ignore
@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  reactiveForm!: FormGroup;
  //form!: FormGroup;
  user: ClienteModel = new ClienteModel();



  local_data:any;
  public parametro:ClienteModel = new ClienteModel();
  public idParametro!: number;

  //private notifyTipoParametro;

  constructor(
    private tipoParametroService: ClienteService,
    public dialogRef: MatDialogRef<FormClienteComponent>,
    private formBuilder: FormBuilder,
    //notifierService: NotifierService,
    private cdref: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public datos:any
  ) {
    console.log(datos);
    if (datos.accion=='EDITAR'){
      this.parametro = datos.data;// datos.data;
      this.idParametro = datos.data.idProfesion;
    }
    this.local_data = {...this.local_data};
    //this.notifyTipoParametro = notifierService;
  }

  ngOnInit(): void {
    //this.parametro.usuarioRegistro = 'ROOSBELTH';
    this.cdref.detectChanges();
    this.formsValidar();
  }

  formsValidar(){
    this.reactiveForm = this.formBuilder.group({
      profesion: new FormControl(this.parametro.apellido, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250),
      ]),
      detalle: new FormControl(this.parametro.nombre, [
        Validators.maxLength(250),
      ]),
      /*password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(15),
      ]),*/
    });
  }

  get detalle() {
    return this.reactiveForm.get('detalle')!;
  }

  get profesion() {
    return this.reactiveForm.get('profesion')!;
  }


  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.user = this.reactiveForm.value;
    console.info('Name:', this.user.apellido);
    console.info('Nickname:', this.user.nombre);
  }


  close(){
    this.dialogRef.close();
  }

  registrar() {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.parametro = this.reactiveForm.value;
    //this.parametro.usuarioRegistro= 'RALVA';
    console.log(this.parametro);

    //this.parametro.usuarioRegistro = 'ROOSBELTH';
    this.tipoParametroService.guardar(this.parametro).subscribe((response: any) => {
      console.log(response);
      if (response.estado) {
        this.dialogRef.close(this.parametro);
      } else {
        //this.notifyTipoParametro.notify('error', 'Error al registrar!');
      }
    });
  }

  editar(){

    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.parametro = this.reactiveForm.value;
    //this.parametro.usuarioModifica= 'RALVA';
    //this.parametro.idProfesion= this.idParametro;

    console.log('DATOS PARA GUARDAR', this.parametro);
    this.tipoParametroService.actualizar(this.parametro).subscribe((response: any) => {
      console.log(response);
      if (response.estado) {
        this.dialogRef.close(this.parametro);
      } else {
        //this.notifyTipoParametro.notify('error', 'Error al registrar!');
      }
    });
  }


}
