import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import * as L from 'leaflet';
import { ZonasService } from '../zonas.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

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
    this.zonasService.getList().subscribe( zonas => {
      console.log('zonas', zonas);
    });
  }

}
