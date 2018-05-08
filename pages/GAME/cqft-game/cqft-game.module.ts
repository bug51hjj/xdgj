import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CqftGamePage } from './cqft-game';

@NgModule({
  declarations: [
    CqftGamePage,
  ],
  imports: [
    IonicPageModule.forChild(CqftGamePage),
  ],
})
export class CqftGamePageModule {}
