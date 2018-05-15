import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { LoginPage } from '../../../pages/login/login';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-account',
	templateUrl: 'account.html',
})
export class AccountPage {
	public LoginPage: any = LoginPage;
	public accountData: any = {
		username: '加载中...',
		realname: '加载中...',
		qq: '加载中...',
		phone: '加载中...',
		amount: '加载中...'
	}
	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public HttpService: HttpServiceProvider,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController) {

	}

	ionViewDidLoad() {
		this.getUserData()
	}
	ngOnChanges() {

	}
	getUserData() {
		let token = window.localStorage.getItem('token');
		let urls = [{ url: `/member/amount?tk=${token}` }, { url: `/member/info?tk=${token}` }]
		let loader = this.loadingCtrl.create({ content: "数据加载中..." });
		loader.present();
		this.HttpService.gets(urls).subscribe(
			result => {
				loader.dismiss();
				result.map(item => {
					let res = item['json']();
					if (res.errorcode == 0) {
						if ('amount' in res) { this.accountData.amount = res.amount }
						if ('username' in res) { this.accountData.username = res.username }
						if ('realname' in res) { this.accountData.realname = res.realname == "" ? '未填写' : res.realname }
						if ('qq' in res) { this.accountData.qq = res.qq == "" ? '未填写' : res.qq }
						if ('email' in res) { this.accountData.email = res.email == "" ? '未填写' : res.email }
						if ('weixin' in res) { this.accountData.weixin = res.qq == "" ? '未填写' : res.weixin }
						if ('phone' in res) { this.accountData.phone = res.phone == "" ? '未填写' : res.phone }
					} else {
						this.httpErrorHandle(res)
					}

				})
			}
		);
	}
	changeInfo(key,keyname) {
		let prompt = this.alertCtrl.create({
			title: '修改个人信息',
			message: `请输入新的${keyname}`,
			inputs: [
				{
					name: `val`,
					placeholder: `请输入新的${keyname}`
				},
			],
			buttons: [
				{text: '取消'},
				{
					text: '确认修改',
					handler: data => {
						this.postChangeInfo(key,data)
					}
				}
			]
		});
		prompt.present();
	}
	postChangeInfo(key,value){
		let token = window.localStorage.getItem('token');
		let url = `/member/info_update?tk=${token}`
		let params = `${key}=${value.val}`;
		let loader = this.loadingCtrl.create({ content: "数据加载中..." });
		loader.present();
		this.HttpService.post(url,params).subscribe((res: Response) => {
			loader.dismiss();
			if(res['errorcode']==0){
				this.getUserData();
			}else{
				this.httpErrorHandle(res)
			}
		})
	}
	httpErrorHandle(result) {
		let errorcode = result.errorcode;
		let errormsg = result.errormsg;
		let alert;
		if (errorcode == 103) {
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
