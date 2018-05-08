import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BjpkGamePage } from './bjpk-game';

@NgModule({
  declarations: [
    BjpkGamePage,
  ],
  imports: [
    IonicPageModule.forChild(BjpkGamePage),
  ],
})
export class BjpkGamePageModule {}
