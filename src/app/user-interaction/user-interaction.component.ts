import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInteractionService } from './user-interaction.service';
import { response_ } from '../api-socket/response-model';

@Component({
  selector: 'user-interaction',
  templateUrl: './user-interaction.component.html',
  styleUrls: ['./user-interaction.component.scss']
})
export class UserInteractionComponent implements OnInit {

  private headers;
  private smartphone: any[] = [];
  @Output() public closeModal = new EventEmitter();
  constructor(private userIntService: UserInteractionService) { }

  ngOnInit() {


  }
  handleMessage(message: response_) {

  }

  getStatus() {
    this.userIntService.getStatus().subscribe(resp => {
      console.log(resp);
      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
      // for (const data of resp.body) {
      //   this.smartphone.push(data);
      // }
      debugger
      console.log(this.smartphone);
    });
  }

  fileProgress(event) {

  }
  operateResponse(comnt: any) { }

  resolveChange() {

    this.getStatus();
  }

  Stop_() {
    this.closeModal.emit();
    this.userIntService.stopCommand()
      .subscribe(res => {
        debugger;
      }, err => {
        console.log(err);
      });
  }
  Start_() {

    this.closeModal.emit();
    this.userIntService.startCommand()
      .subscribe(res => {
        debugger;
      }, err => {
        console.log(err);
      });

  }
}
