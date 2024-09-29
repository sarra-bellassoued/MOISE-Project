
import { Component } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontPi';
  url!: string;
  url1!: string;
  activeRoute!: string;
  active2Route!: string;
  hideFooter: boolean = false;
  constructor(private router: Router) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const url = event.url.split("/");
        this.url = url[1];
        this.url1 = url[2];
        this.activeRoute = this.url;
        this.active2Route = this.url1;
        const body = document.getElementsByTagName('body')[0];
        if ( this.active2Route === "chat-professor" || this.active2Route === "map-grid" || this.active2Route === "map-list" || this.active2Route === "chat" || this.active2Route === "voice-call" || this.active2Route === "video-call") {
          this.hideFooter = true;
        } else {
          this.hideFooter = false;
        }
        if ( this.active2Route === "professor-register" || this.active2Route === "login" || this.active2Route === "register" || this.active2Route === "forgot-password") {
          body.classList.add('account-page');
        } else {
          body.classList.remove('account-page');
        }
        if ( this.active2Route === "chat" || this.active2Route === "chat-professor") {
          body.classList.add('chat-page');
        } else {
          body.classList.remove('chat-page');
        }
      }
    });
  }

  
}
