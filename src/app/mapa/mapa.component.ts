import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, polygon } from 'leaflet';
import * as L from 'leaflet';
import { ZonasService } from '../zonas.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  zonas = [];
  poligonoActivo;
  idActivo;
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

  constructor(private zonasService: ZonasService) { }

  ngOnInit() {
    this.zonasService.getList().subscribe( (zonas: Array<any>) => {
      console.log('zonas', zonas);
      const zonasAux = [];
      zonas.forEach(element => {
        const layer = polygon(L.GeoJSON.coordsToLatLngs(element.mpoly.coordinates, 2));
        zonasAux.push(
          layer.on('click', () => {
            if (this.poligonoActivo) {
              this.poligonoActivo.setStyle({fillColor: '#000000'});
            }
            layer.setStyle({fillColor: '#bb00aF'});
            this.poligonoActivo = layer;
            this.idActivo = element.id;
            console.log('poligono activo', this.poligonoActivo, this.idActivo);
          })
        );
      });
      console.log(zonasAux);
      this.zonas = zonasAux;
    });
  }

  showPopup(el, la): void {
  }

}
