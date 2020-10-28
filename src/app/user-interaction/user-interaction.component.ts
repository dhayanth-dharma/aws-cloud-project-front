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

}
