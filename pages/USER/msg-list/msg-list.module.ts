import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgListPage } from './msg-list';

@NgModule({
  declarations: [
    MsgListPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgListPage),
  ],
})
export class MsgListPageModule {}
