import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SscGamePage } from './ssc-game';


@NgModule({
  declarations: [
    SscGamePage,
  ],
  imports: [
    IonicPageModule.forChild(SscGamePage),
  ],
})
export class SscGamePageModule {}
