import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  API_URL  =  environment.api_host + '/mensajes/';

  constructor(private  httpClient: HttpClient) { }

  getList(zona) {
    const params = {zona};
    return  this.httpClient.get(this.API_URL, {params});
  }

  newMens(zona, autor, titulo, texto) {
    return this.httpClient.post(this.API_URL, { zona, autor , titulo, texto});
  }

}
