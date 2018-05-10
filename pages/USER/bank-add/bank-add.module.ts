import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankAddPage } from './bank-add';

@NgModule({
  declarations: [
    BankAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BankAddPage),
  ],
})
export class BankAddPageModule {}
