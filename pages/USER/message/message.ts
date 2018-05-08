import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
	public datas:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit(){
  	this.datas = this.navParams.get('datas');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

}
