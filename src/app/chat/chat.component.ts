import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  url;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      const url = 'https://kiwiirc.com/client/irc.kiwiirc.com/?nick=confinada_?&theme=mini#' + id;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

}
