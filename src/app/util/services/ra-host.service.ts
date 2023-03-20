import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class RaHostService {
  public APPLICATION_API_HOST: string = "";
  constructor() {
    switch (environment.production) {
      case true:
        // AL DEPLEGAR CAMBIAR RUTA DEFINIDO PARA BACKEND
        this.APPLICATION_API_HOST = environment.host_back;
        break;
      case false:
        this.APPLICATION_API_HOST = environment.host_back;
        break;

    }
  }
}
