import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MensajesService } from '../mensajes.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  autor = new FormControl('');
  titulo = new FormControl('');
  texto = new FormControl('');


  zonaId;
  listaMensajes;
  nuevoMens = false;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private mensajesServie: MensajesService,
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.zonaId = params.get('id');
      this.listaMensajes = this.mensajesServie.getList(this.zonaId);
    });
  }


  submit() {
    this.mensajesServie.newMens(this.zonaId, this.autor.value, this.titulo.value, this.texto.value).subscribe(
      res => {
        window.location.reload();
      },
      error => {
        this.autor.markAsTouched();
        this.titulo.markAsTouched();
        this.texto.markAsTouched();
      }
    );
  }

}
