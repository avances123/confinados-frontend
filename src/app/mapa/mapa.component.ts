import { Component, OnInit, NgZone } from '@angular/core';
import { tileLayer, latLng, polygon } from 'leaflet';
import * as L from 'leaflet';
import { ZonasService } from '../zonas.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

L.drawLocal.draw.toolbar.buttons.polygon = 'Dibuja un area en el mapa para chatear con tus vecinos';
L.drawLocal.draw.handlers.polygon.tooltip.start = 'Haz click para empezar a dibujar';

const LIMITE_AREA = 1000000;


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  zoom = 7;
  center = latLng(40.416775, -3.703790);
  zonas = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 7,
    center: latLng(40.416775, -3.703790)
  };
  drawOptions = {
    position: 'topleft',
    draw: {
      marker: false,
      polyline: false,
      circle: false,
      rectangle: false,
      circlemarker: false,
    },
    edit: {
      edit: false,
      remove: false
    }
  };

  constructor(
    private ngZone: NgZone,
    private zonasService: ZonasService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.findMe();
    this.zonasService.getList().subscribe((zonas: Array<any>) => {
      // console.log('zonas', zonas);
      const zonasAux = [];
      zonas.forEach(element => {
        const layer = polygon(L.GeoJSON.coordsToLatLngs(element.mpoly.coordinates, 2));
        zonasAux.push(
          layer.on('click', () => {
            this.ngZone.run(() => this.router.navigate(['/chat/', element.id]));
          })
        );
      });

      this.zonas = zonasAux;
    });
  }

  enviarZona(ev) {
    const area = L.GeometryUtil.geodesicArea(ev.layer.getLatLngs()[0]);
    if (area > LIMITE_AREA) {
      this.snackBar.open('El area es demasiado grande, prueba con una mas pequeña', '', { duration: 3000});
      ev.layer.remove();
      return;
    }
    this.zonasService.create(ev.layer).subscribe( (element: any) => {
      this.router.navigate(['/chat/', element.id]);
    });
  }


  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = L.latLng(position.coords.latitude, position.coords.longitude );
        this.zoom = 15;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


}
