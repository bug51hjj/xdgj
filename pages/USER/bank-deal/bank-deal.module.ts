import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankDealPage } from './bank-deal';

@NgModule({
  declarations: [
    BankDealPage,
  ],
  imports: [
    IonicPageModule.forChild(BankDealPage),
  ],
})
export class BankDealPageModule {}
