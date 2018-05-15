import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-confirm-order',
	templateUrl: 'confirm-order.html'
})
export class ConfirmOrderPage {
	private selectedDatas:any = {list:[[0]],type:''};
	public buyAmount;
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}

	ionViewDidLoad() {
		this.selectedDatas = JSON.parse(this.navParams.get('selectedDatas'));
		this.buyAmount = JSON.parse(this.navParams.get('buyAmount'));
	}
	dissmiss() {
		this.viewCtrl.dismiss(false);
	}
	confirm() {
		this.viewCtrl.dismiss(true);
	}

}
