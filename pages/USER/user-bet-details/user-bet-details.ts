import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { LoginPage } from '../../../pages/login/login';

@Component({
	selector: 'page-user-bet-details',
	templateUrl: 'user-bet-details.html',
})
export class UserBetDetailsPage {
	public order_id: string;
	public buy_details:string;
	public orderStatus: any = false;
	public orderDatas: any = [];
	constructor(public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public HttpService: HttpServiceProvider,
		public navParams: NavParams) {
		this.order_id = this.navParams.get('order_id');
	}

	ionViewDidLoad() {
		this.getOrderPending()
	}
	getOrderPending() {
		let token = window.localStorage.getItem('token');
		let url = `/order/details?tk=${token}&orderid=${this.order_id}`;
		let loader = this.loadingCtrl.create({ content: "加载中..." });
		loader.present();
		this.orderStatus = true;
		this.HttpService.get(url).subscribe((res: Response) => {
			if (res['errorcode'] == 0) {
				console.log(res)
				this.orderDatas = res['order'];
				this.buy_details = this.navParams.get('buy_details');
			} else {
				this.httpErrorHandle(res)
			}
			loader.dismiss();
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