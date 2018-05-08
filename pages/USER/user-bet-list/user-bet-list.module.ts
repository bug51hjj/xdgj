import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBetListPage } from './user-bet-list';

@NgModule({
  declarations: [
    UserBetListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBetListPage),
  ],
})
export class UserBetListPageModule {}
