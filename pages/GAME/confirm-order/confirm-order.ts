import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-confirm-order',
	template: `
  	<div style="width:100vw; height:100vh; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.6);">
	<div style="width:88%; min-height:200px; background-color:#fff; border-radius:3px;">
		<div style="padding: 15px 10px; border-bottom: 1px solid #eee; text-align: center;">下注清单</div>
		<div style="min-height:100px;max-height:260px; overflow-y:scroll;">
			<ul>
				<li style="color:#555;line-height:24px;" *ngFor="let item of selectedList">{{item}}x{{buyAmount}}</li>
			</ul>
		</div>
		<div style="display:flex; justify-content:center; align-items:center; padding: 10px; min-height: 65px;">
			<a (click)="dissmiss()" style="flex: 1; display: block; min-height: 45px; border-radius: 2px; line-height: 45px; margin-right: 5px; text-align:center; background-color:#f8f8f8; color:#444;">取消</a>
			<a (click)="confirm()" style="flex: 1; display: block; min-height: 45px; border-radius: 2px; line-height: 45px; margin-right: 5px; text-align:center; background-color:#d83547; color:#fff;">确定</a>
		</div>
	</div>
</div>
  `
})
export class ConfirmOrderPage {
	private selectedList;
	public buyAmount;
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}

	ionViewDidLoad() {
		this.selectedList = JSON.parse(this.navParams.get('selectedList'));
		this.buyAmount = JSON.parse(this.navParams.get('buyAmount'));
	}
	dissmiss() {
		this.viewCtrl.dismiss(false);
	}
	confirm() {
		this.viewCtrl.dismiss(true);
	}

}
