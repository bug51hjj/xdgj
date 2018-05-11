import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { LoginPage } from '../../../pages/login/login';
import { UserBetDetailsPage } from '../../../pages/USER/user-bet-details/user-bet-details'; //用户中心-订单详情
@Component({
	selector: 'page-user-beted-list',
	templateUrl: 'user-beted-list.html',
})
export class UserBetedListPage {
	public queryDate: string;
	public orderStatus: any = false;
	public orderDatas: any = [];
	constructor(public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public HttpService: HttpServiceProvider,
		public navParams: NavParams) {
		this.queryDate = this.navParams.get('date');
	}

	ionViewDidLoad() {
		this.getOrderOutcome()
	}
	getOrderOutcome() {
		let token = window.localStorage.getItem('token');
		let url = `/order/outcome?tk=${token}&date=${this.queryDate}`;
		let loader = this.loadingCtrl.create({ content: "加载中..." });
		loader.present();
		this.orderStatus = true;
		this.HttpService.get(url).subscribe((res: Response) => {
			if (res['errorcode'] == '') {
				console.log(res)
				this.orderDatas = res['order'];
				if (res['order'].length === 0) {
					let alert = this.alertCtrl.create({
						subTitle: "无订单记录",
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
	queryOrderDetails(order){
		this.navCtrl.push(UserBetDetailsPage,{order_id:order.id,buy_details:order.buy_details})
	}
}
