import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { LoginPage } from '../../../pages/login/login';

@Component({
	selector: 'page-user-bet-list',
	templateUrl: 'user-bet-list.html',
})
export class UserBetListPage {
	public gamekey: string;
	public panName: string;
	public orderStatus: any = false;
	public orderDatas: any = [];
	constructor(public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public HttpService: HttpServiceProvider,
		public navParams: NavParams) {
		this.gamekey = this.navParams.get('gameKey');
		this.panName = this.navParams.get('panName');
	}

	ionViewDidLoad() {
		this.getOrderPending()
	}
	getOrderPending() {
		let token = window.localStorage.getItem('token');
		let url = `/order/pending?tk=${token}&gamekey=${this.gamekey}&pan=${this.panName}`;
		let loader = this.loadingCtrl.create({ content: "加载中..." });
		loader.present();
		this.orderStatus = true;
		this.HttpService.get(url).subscribe((res: Response) => {
			if (res['errorcode'] == '') {
				console.log(res)
				this.orderDatas = res['order'];
				if (res['order'].length === 0) {
					let alert = this.alertCtrl.create({
						subTitle: "您未在该期下单!",
						buttons: [{
							text: '返回',
							handler: () => {
								this.navCtrl.pop()
							}
						}]
					});
					alert.present();
				} else {
					this.orderStatus = true;
				}
			} else {
				this.httpErrorHandle(res)
			}
			loader.dismiss();
		})
	}
	orderCancelConfirm(order) {
		console.log(order)
		let confirm = this.alertCtrl.create({
			title: '是否撤单?',
			buttons: [
				{text: '取消'},
				{
					text: '确定',
					handler: () => {
						this.orderCancelEvent(order.id)
					}
				}
			]
		});
		confirm.present();
	}
	orderCancelEvent(order_id){
		let token = window.localStorage.getItem("token");
		let url = `/order/cancel?tk=${token}`;
		let params = `orderid=${order_id}`
		this.HttpService.post(url,params).subscribe((res: Response) => {
			console.log(res)
		})
	}
	httpErrorHandle(result) {
		let errorcode = result.errorcode;
		let errormsg = result.errormsg;
		let alert;
		if (result == 100) {
			alert = this.alertCtrl.create({
				subTitle: '登录超时请重新登录!',
				buttons: [{
					text: '确定',
					handler: () => {
						this.navCtrl.push(LoginPage)
					}
				}]
			});
		} else {
			alert = this.alertCtrl.create({
				subTitle: errormsg,
				buttons: ['确认']
			});
		}
		alert.present();
	}
}
