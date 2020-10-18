import { MainPageComponent } from './main-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageRoutingModule } from './main-page-routing.module';
import { StatusDisplayComponent } from './status-display/status-display.component';



@NgModule({
  declarations: [MainPageComponent, StatusDisplayComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }
