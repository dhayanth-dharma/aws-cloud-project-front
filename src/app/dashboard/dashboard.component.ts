
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FillingSocketAPI } from './../api-socket/filling-api.socket';
import { response_ } from '../api-socket/response-model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  closeResult: string;
  _message: string = "connection in progress"
  greeting: any;
  my_page_id = 1;
  _message_2 = "";
  _message_3 = "";
  name: string = "daya";
  is_connected = false;
  is_offline = false;
  constructor(private modalService: NgbModal,
    private webSocketAPI: FillingSocketAPI) {

  }

  ngOnInit() {
    //initiating connection to the ws
    this._message = "Initiating connection to the interface";
    this.connect();
    this.webSocketAPI.toggle.subscribe(res => {
      this.handleMessage(res);
    });
  }


  openBackDropCustomClass(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {

    this.modalService.open(content, { size: 'lg' });
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }


  //websocket functions 
  connect() {
    debugger
    setTimeout(() => {
      this._message = "Connecting to the Socket";

    }, 5000);
    setTimeout(() => {
      debugger

      this.webSocketAPI._connect();
      this._message = "Protocol status : live";
    }, 2000);


    this._message = "Connected";
    setTimeout(() => {
      this._message = "Creating socket tunnel";
    }, 3000);
    setTimeout(() => {
      debugger

      this.webSocketAPI._initial_connect();
    }, 5000);

    this._message = "Socket tunnel created";

  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send_ws(this.name);
  }
  buttonClick() {
    this.webSocketAPI._initial_connect();
  }

  handleMessage(message: response_) {
    // this.greeting = message;
    debugger;
    if (message.message_type != "message")
      return;

    if (message.status == "connected") { this.is_connected = true; }

    if (message.page_id == 3 && message.func_id == 112) {
      this.setOffline();
      //Result of number list


    }
    if (message.page_id == 3 && message.func_id == 113) {
      this.setOnline();
    }
    this._message = message.message;

  }

  setOffline() {
    this.is_connected = true;
    this.is_offline = true;
  }

  setOnline() {
    this.is_connected = true;
    this.is_offline = false;
  }

}
