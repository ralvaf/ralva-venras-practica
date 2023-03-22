import { Injectable } from '@angular/core';
import {RaHostService} from "../../../util/services/ra-host.service";
import {RaRestHttpService} from "../../../util/services/ra-rest-http.service";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private httpApiService: RaRestHttpService,
    private  hostApi: RaHostService
  ) { }

  /*listarTipoParametro(page: number, size: number, sort: string, filtro: string): any{
    return this.httpApiService.get(
      this.hostApi.APPLICATION_API_HOST,
      "/tipoParametro/inicializar?page="+page+"&size="+size+"&sort=tipoParametro,desc&filtro="+filtro+""
    )
  }*/

  guardar(parametro:any): any {
    return this.httpApiService.post(
      this.hostApi.APPLICATION_API_HOST,
      '/agregar', parametro
    );
  }

  inicializar(parametro:any): any {
    return this.httpApiService.get(
      this.hostApi.APPLICATION_API_HOST,
      '/listar'//, parametro
    );
  }


  ver(parametro:any): any {
    return this.httpApiService.post(
      this.hostApi.APPLICATION_API_HOST,
      '/profesion/ver', parametro
    );
  }

  actualizar(parametro:any): any {
    return this.httpApiService.post(
      this.hostApi.APPLICATION_API_HOST,
      '/actualizar', parametro
    );
  }

  cambiarEstado(parametro:any): any {
    return this.httpApiService.delete(
      this.hostApi.APPLICATION_API_HOST,
      '/eliminar/', parametro.codigo
    );
  }

}
