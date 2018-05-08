import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FtGamePage } from './ft-game';

@NgModule({
  declarations: [
    FtGamePage,
  ],
  imports: [
    IonicPageModule.forChild(FtGamePage),
  ],
})
export class FtGamePageModule {}
