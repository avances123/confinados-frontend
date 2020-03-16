import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  API_URL  =  environment.api_host + '/zonas/';

  constructor(private  httpClient: HttpClient) { }

  getList() {
    return  this.httpClient.get(this.API_URL);
  }
}
