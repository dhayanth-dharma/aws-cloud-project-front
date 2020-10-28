import { UserInteractionService } from './../user-interaction/user-interaction.service';
import { Component, OnInit, Output } from '@angular/core';
import { response_ } from '../api-socket/response-model';
import { FillingSocketAPI } from '../api-socket/filling-api.socket';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  system_status: any = "init";
  cup_size: any = "init";
  is_connected: boolean = false;
  _message: string = "";
  is_cup_presence: boolean = false;
  is_started = false;
  cup_size_letr: string = "unknown";
  process_percent: any = 0;
  prod_avail: string = "Unknown";
  process_status = "Not Initiated";
  potting_speed: string = "Unknown";
  _power_value = 0;

  //CLOUD COMPUTGING
  median: number = 0;
  numberArr: string[] = [];
  sendNumberList: any[] = [];
  inputError: boolean = false;
  sendImageList: any[] = [];
  logData: any[] = [];
  waitingImage: boolean = false;
  constructor(private webSocketAPI: FillingSocketAPI,
    private http: HttpClient, private userInteractionService: UserInteractionService) { }

  ngOnInit() {
    this.webSocketAPI.toggle.subscribe(res => {
      this.handleMessage(res);
    });
  }
  handleMessage(message: response_) {

    if (message.code == 201 &&
      message.page_id == 1) {
      if (message.status == "connected")
        this.is_connected = true;
    }
    if (message.page_id == 2 && message.func_id == 101) {
      this.is_connected = true;
    }
    if (message.page_id == 3 && message.func_id == 113) {
      this.setOnline();
    }

    if (message.page_id == 2 && message.func_id == 118) {
      this.potting_speed = message.arg;
    }
    if (message.page_id == 2 && message.func_id == 200) {
      //RESULT OF MEDIAN
      let obj = JSON.parse(message.message);
      let index = this.sendNumberList.findIndex(o => o.id === obj.id);
      this.sendNumberList[index] = obj;
    }
    if (message.page_id == 2 && message.func_id == 201) {
      this.downloadImageV2(message.message);
    }
    if (message.page_id == 2 && message.func_id == 204) {
      //LOG DATA
      this.logData = JSON.parse(message.message);
      console.log(this.logData);
    }
    this._message = message.message;
  }

  downloadImage(key: string) {
    this.userInteractionService.downloadImage(key)
      .subscribe(data => this.downloadFile(data)),//console.log(data),
      error => console.log('Error downloading the file.'),
      () => console.info('OK');
  }
  downloadImageV2(key: string) {
    this.userInteractionService.downloadFilev(key)
      .subscribe((resp: any) => {
        this.downloadFileV2(resp, key);
      });
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'jpg' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  downloadFileV2(response: any, key: any) {
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    this.waitingImage = false;
    downloadLink.setAttribute('download', "");
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  setOnline() {
    this.is_cup_presence = false;
    this.is_connected = true;
    this.process_percent = 0;
    this.is_started = true;
    this.system_status = "init";
    this.cup_size = "init";
    this.potting_speed = "init";
    this.is_cup_presence = false;
    this.is_started = false;
    this.cup_size_letr = "unknown";
    this.prod_avail = "Unknown";
    this.process_status = "Not Initiated";
  }


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  uploadImage() {
    this.waitingImage = true;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.userInteractionService.uploadImage(formData)
      .subscribe((res: any) => {
        console.log(res);

      });
  }

  sendNumber(numListInput: string) {
    let valid = numListInput.match(/^[0-9]+(,[0-9]+)*$/);
    if (!valid) {
      console.log("succes");
      this.inputError = true;
      return;
    }
    this.inputError = false;
    let splitedNumber = numListInput.split(",");
    this.numberArr = splitedNumber;
    let obj = {
      id: this.sendNumberList.length,
      input: splitedNumber,
      output: ''
    }
    this.sendNumberList.push(obj);
    this.userInteractionService.sendNumberList(obj)
      .subscribe(res => {
        console.log(res);
      })
  }

}
