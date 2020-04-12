import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  data = [];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.webSocketService.listen('custom').subscribe((data: any) => {
      this.data.push(data.socket);
      console.log(data);
    })
  }

}
