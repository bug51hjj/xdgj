import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameCenterPage } from './game-center';

@NgModule({
  declarations: [
    GameCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(GameCenterPage),
  ],
})
export class GameCenterPageModule {}
