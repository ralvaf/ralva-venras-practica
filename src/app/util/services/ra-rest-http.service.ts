import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, Observable, retry, tap, throwError} from "rxjs";



const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export class RaRestHttpService {

  constructor(
    private httpClient: HttpClient
  ) {

  }




  get(host: string, url: string): Observable<Response> {
    return this.httpClient.get<Response>(host + url)
      .pipe(
        retry(1),
        catchError(this.handleError),
        tap((data: Response) =>
          console.log('GET RESPONSE: ', data))
      );
  }

  post(host: string, url: string, parametro: any): Observable<Response> {
    return this.httpClient.post<Response>(host + url, parametro)
      .pipe(
        retry(1),
        catchError(this.handleError),
        tap((data: any) =>
          console.log('POST RESPONSE: ', data))
      );
  }

  /*postBlob(host: string, url: string, parametro: any): Observable<Blob> {
    return this.httpClient.post<Blob>(host + url, parametro, {observe: 'response', responseType: 'blob'})
      .pipe(
        retry(1),
        catchError(this.handleError),
        tap((data: any) =>
          console.log('POST RESPONSE: ', data))
      );
  }*/



  postFile(host: string, url: string, parametro: any): Observable<HttpResponse<Blob>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.httpClient.post<Blob>(host+url, parametro,
      {
        headers: httpHeaders,
        observe: 'response'
      }
    ).pipe();
  }

  put(host: string, url: string, parametro: any): Observable<Response> {
    return this.httpClient.put<Response>(host + url, parametro)
      .pipe(
        retry(1),
        catchError(this.handleError),
        tap((data: any) =>
          console.log('PUT RESPONSE: ', data))
      )
  }

  delete(host: string, url: string, id: number){
    return this.httpClient.delete<Response>(`${host}${url}/Id?Id=${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError),
        tap((data: any) =>
          console.log('DELETE RESPONSE: ', data))
      )
  }

  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    console.log(errorMessage);
    //return throwError(errorMessage);
    return throwError(() => errorMessage);
  }
}
