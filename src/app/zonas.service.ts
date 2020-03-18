import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  API_URL  =  environment.api_host + '/zonas/';

  constructor(private  httpClient: HttpClient) { }

  getList() {
    return  this.httpClient.get(this.API_URL);
  }

  create(layer) {
    let latlngs = layer.getLatLngs()[0].map( latlng => [latlng.lng, latlng.lat]);
    latlngs.push(latlngs[0]);
    const nuevaZona = {mpoly: { type: 'MultiPolygon', coordinates: [[latlngs]]}};
    console.log(nuevaZona);
    return  this.httpClient.post(this.API_URL, nuevaZona);
  }
}
