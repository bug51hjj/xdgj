import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LhcGamePage } from './lhc-game';

@NgModule({
  declarations: [
    LhcGamePage,
  ],
  imports: [
    IonicPageModule.forChild(LhcGamePage),
  ],
})
export class LhcGamePageModule {}
