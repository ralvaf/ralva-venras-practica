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
  public codigo!: number;

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
      this.codigo = datos.data.codigo;
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
      nombre: new FormControl(this.parametro.nombre, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250),
      ]),

      apellido: new FormControl(this.parametro.apellido, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250),
      ]),

      email: new FormControl(this.parametro.apellido, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250),
      ]),

      telefono: new FormControl(this.parametro.apellido, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(250),
      ])

    });
  }

  get nombre() {
    return this.reactiveForm.get('nombre')!;
  }

  get apellido() {
    return this.reactiveForm.get('apellido')!;
  }
  get email() {
    return this.reactiveForm.get('email')!;
  }

  get telefono() {
    return this.reactiveForm.get('telefono')!;
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

    console.log(this.parametro);


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
    console.log('DATOS PARA GUARDAR', this.parametro);
    this.parametro.codigo = this.codigo;
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
