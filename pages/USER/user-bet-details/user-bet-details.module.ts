import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBetDetailsPage } from './user-bet-details';

@NgModule({
  declarations: [
    UserBetDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBetDetailsPage),
  ],
})
export class UserBetDetailsPageModule {}
