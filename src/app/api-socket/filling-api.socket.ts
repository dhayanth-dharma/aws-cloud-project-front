import { AppComponent } from '../app.component';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { response_ } from './response-model';
@Injectable()
export class FillingSocketAPI {
    webSocketEndPoint: string = 'ws://localhost:8080/potting_initiate_connect';
    // webSocketEndPoint: string = 'ws://54.167.119.168:8282/potting_initiate_connect';

    topic: string = "/topic/greetings";
    stompClient: any;
    appComponent: AppComponent;
    ws: any;
    resp: response_;

    @Output() toggle = new EventEmitter<any>();

    constructor() {
    }

    _connect() {
        this.ws = new WebSocket(this.webSocketEndPoint);
        this.ws.onmessage = (data) => {
            console.log(data);
            this.onMessageReceived(data);
        }
    }

    _disconnect2() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();

        }
        console.log("Disconnected");
    }
    _disconnect() {
        if (this.ws !== null) {
            this.ws.disconnect();

        }
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 3000);
    }

    /**
     * Send message to sever via web socket
     * @param {*} message 
     */
    _initial_connect() {

        var data = JSON.stringify({
            'controller': "connection",
            'function': 'initiate_connect',
            'purpose': 'create connection'
        })
        this.ws.send(data);
    }

    _send_ws(message) {

        this.ws.send(message);
    }

    onMessageReceived(message) {
        this.resp = new response_();
        this.resp = JSON.parse(message.data);
        this.toggle.emit(this.resp);
    }
}