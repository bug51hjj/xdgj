import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BjftGamePage } from './bjft-game';

@NgModule({
  declarations: [
    BjftGamePage,
  ],
  imports: [
    IonicPageModule.forChild(BjftGamePage),
  ],
})
export class BjftGamePageModule {}
