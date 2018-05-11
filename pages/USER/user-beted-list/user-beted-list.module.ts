import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBetedListPage } from './user-beted-list';

@NgModule({
  declarations: [
    UserBetedListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBetedListPage),
  ],
})
export class UserBetedListPageModule {}
