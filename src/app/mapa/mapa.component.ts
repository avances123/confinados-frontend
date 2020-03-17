import { Component, OnInit, NgZone } from '@angular/core';
import { tileLayer, latLng, polygon } from 'leaflet';
import * as L from 'leaflet';
import { ZonasService } from '../zonas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  zonas = [];
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 6,
    center: latLng(40.416775, -3.703790)
  };
  drawOptions = {
    position: 'topright',
    draw: {
       marker: {
          icon: L.icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png'
          })
       },
       polyline: false,
       circle: {
           shapeOptions: {
               color: '#aaaaaa'
           }
       }
    }
  };

  constructor(
    private ngZone: NgZone,
    private zonasService: ZonasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.zonasService.getList().subscribe( (zonas: Array<any>) => {
      console.log('zonas', zonas);
      const zonasAux = [];
      zonas.forEach(element => {
        const layer = polygon(L.GeoJSON.coordsToLatLngs(element.mpoly.coordinates, 2));
        zonasAux.push(
          layer.on('click', () => {
            console.log('Abrimos chat para el id', element.id);
            this.ngZone.run(() => this.router.navigate(['/chat/', element.id]));
          })
        );
      });
      this.zonas = zonasAux;
    });
  }

}
