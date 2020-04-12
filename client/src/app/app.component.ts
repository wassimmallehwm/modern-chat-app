import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
