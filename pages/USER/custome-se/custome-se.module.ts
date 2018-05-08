import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomeSePage } from './custome-se';

@NgModule({
  declarations: [
    CustomeSePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomeSePage),
  ],
})
export class CustomeSePageModule {}
