import { Component } from '@angular/core';
import { FillingSocketAPI } from './api-socket/filling-api.socket';
import { response_ } from './api-socket/response-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // webSocketAPI: FillingSocketAPI;
  greeting: any;
  name: string="daya";
  title = 'gui1-user-interaction-filling';
  my_page_id=0;
  my_custom_id=1;
  _message:string;
  is_connected=false;
  constructor(  private  webSocketAPI: FillingSocketAPI){
  
  }

  ngOnInit() {
    // this.webSocketAPI = new FillingSocketAPI(new AppComponent());
    // this.connect();
    // this.sendMessage();
    this.webSocketAPI.toggle.subscribe(res=>{
      this.handleMessage(res);
    });
  }

  handleMessage(message:response_){
    // this.greeting = message;
    debugger;
    if(message.page_id!=this.my_page_id)
    {
      
      return;
    }
 this._message=message.message;
    
  }
  connect(){
    debugger
    this.webSocketAPI._initial_connect();
    // this.sendMessage();

  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){

    this.webSocketAPI._send_ws(this.name);
  }

  // handleMessage(message){
  //   this.greeting = message;
  // }
}
