import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { UuidProvider } from '../../../providers/uuid/uuid';
import { BankAddPage } from '../../../pages/USER/bank-add/bank-add'; //用户中心-添加银行卡
import { LoginPage } from '../../../pages/login/login';
@IonicPage()
@Component({
	selector: 'page-bank-deal',
	templateUrl: 'bank-deal.html',
})
export class BankDealPage {
	BankAddPage: any = BankAddPage;
	LoginPage: any = LoginPage;
	bankDealTabActive: any = 'recharge';//withdraw \ record
	rechargeWay: any;
	rechargeChannel: any = {
		loading: true,
		selected: '',
		channel: [],
		form: {
			account: '',
			amount: ''
		},
		single_max: '未选充值渠道',
		single_min: '未选充值渠道'
	};
	withDrawDatas: any = {
		loading: true,
		status: false,
		form: {
			account: '',
			amount: '',
			payPwd: ''
		}
	}
	recordDatas: any = {
		recordType: 'recharge',// withdraw gameGift
		rechargeTrade: {
			loading: true,
			trade: []
		},
		withdrawTrade: {
			loading: true,
			trade: []
		},
	}
	public userInformation: any = {
		username: '加载中...',
		amount: '加载中...',
		realname: '加载中...'
	}
	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public HttpService: HttpServiceProvider,
		public uuid: UuidProvider,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController) {
	}
	ionViewDidLoad() {
		this.getUserData();
	}
	bankDealTabChange(type) {  //充值 提现 交易记录 功能切换
		this.bankDealTabActive = type;
		if (type == "withdraw") {
			this.checkAccountBankCard();
		} else if (type == "record") {
			this.getRecordDatas()
		}
	}
	rechargeWayChange() {  //切换充值渠道
		let channers = this.rechargeChannel.channel;
		channers.map(item => {
			if (item.bank_id === this.rechargeChannel.selected) {
				this.rechargeChannel.single_min = item.single_min;
				this.rechargeChannel.single_max = item.single_max;
			}
		})
	}
	recordTypeChange(type) {
		this.recordDatas.recordType = type;
	}
	getUserData() {  //获取用户基础信息
		let token = window.localStorage.getItem('token');
		let urls = [{ url: `/member/amount?tk=${token}` }, { url: `/member/info?tk=${token}`},{url:`/fund/recharge_channel?tk=${token}`}]
		let loader = this.loadingCtrl.create({ content: "数据加载中..." });
		loader.present();
		this.HttpService.gets(urls).subscribe(
			result => {
				loader.dismiss();
				result.map(item => {
					let res = item['json']();
					if (res.errorcode == 0) {
						if ('amount' in res) { this.userInformation.amount = res.amount }
						if ('username' in res) { this.userInformation.username = res.username }
						if ('realname' in res) { this.userInformation.realname = res.realname }
						if('channel' in res ){this.getRechargeList(res)}
					} else {
						this.httpErrorHandle(res)
					}

				})
			}
		);
	}
	getRechargeList(res) {  //处理充值渠道数据
		let cardImage = `"UNIONPAY","QUICKPAY","JDPAY","QQPAY","ALIPAY","WXPAY","SHBANK","BCCB","PSBC","HXB","CMBC","PAYH","CIB","CEB","CITIC","CGB","SPDB","BOCM","ABC","BOC","CCB","ICBC","CMB"]`;
		res['channel'].map(item => {
			if (cardImage.indexOf(item.bank_id) != -1) {
				item['image'] = item.bank_id;
			} else {
				item['image'] = "QUICKPAY";
			}
		})
		this.rechargeChannel.channel = res['channel'];
		this.rechargeChannel.selected = res['channel'][0].bank_id;
		this.rechargeChannel.single_min = res['channel'][0].single_min;
		this.rechargeChannel.single_max = res['channel'][0].single_max;
		this.rechargeChannel.loading = false;
	}
	getRecordDatas() {  //获取充值提现记录
		this.recordDatas.rechargeTrade.loading = true;
		this.recordDatas.withdrawTrade.loading = true;
		let token = window.localStorage.getItem('token');
		let loader = this.loadingCtrl.create({ content: "数据加载中..." });
		loader.present();
		this.HttpService.gets([
			{url:`/fund/trade_query?tk=${token}&type=recharge`},
			{url:`/fund/trade_query?tk=${token}&type=withdraw`}
		]).subscribe(result => {
			loader.dismiss();
			result.map((item,index)=>{
				let res = item['json']();
				if(res.errorcode == 0){
					if(index==0){
						this.recordDatas.rechargeTrade.loading = false;
						this.recordDatas.rechargeTrade.trade = res['trade'];
					}else{	
						this.recordDatas.withdrawTrade.loading = false;
						this.recordDatas.withdrawTrade.trade = res['trade'];
					}
				}else{this.httpErrorHandle(res)}
			})
		})
	}
	changeRechargrChannel(bankid) {  //改变充值渠道
		this.rechargeChannel.selected = bankid;
		let channers = this.rechargeChannel.channel;
		for (let i = 0; i < channers.length; i++) {
			if (channers[i].bank_id == this.rechargeChannel.selected) {
				this.rechargeChannel.single_max = channers[i].single_max;
				this.rechargeChannel.single_min = channers[i].single_min;
			}
		}
	}
	changeRechargeForm(e, key) {
		this.rechargeChannel.form[key] = e;
	}
	changewithDrawForm(e, key) {
		this.withDrawDatas.form[key] = e;
	}
	checkAccountBankCard() { //检查账号是否绑定银行卡
		let token = window.localStorage.getItem('token');
		let url = `/member/bank_account?tk=${token}`;
		this.withDrawDatas.loading = true;
		let loader = this.loadingCtrl.create({ content: "数据加载中..." });
		loader.present();
		this.HttpService.get(url).subscribe((res: Response) => {
			loader.dismiss();
			this.withDrawDatas.loading = false;
			if (res['errorcode'] == 0 && res['bank_id'] == '') {
				this.withDrawDatas.status = false;
				let alert = this.alertCtrl.create({
					subTitle: '未绑定银行卡，请先绑定银行卡再进行提现操作!',
					buttons: [{ text: '以后再说' }, {
						text: '前往绑定',
						handler: () => {
							this.navCtrl.push(BankAddPage)
						}
					}]
				});
				alert.present();
			} else if (res['errorcode'] == 0 && res['bank_id'] != '') {
				this.withDrawDatas.form.account = res['bank_account'];
				this.withDrawDatas.status = true;
			} else {
				this.httpErrorHandle(res)
			}
		})
	}
	rechargeClickEvent() {   //充值按钮点击事件
		let token = window.localStorage.getItem('token');
		let amount = this.rechargeChannel.form.amount;
		let account = this.rechargeChannel.form.account;
		let unique_requestId = this.uuid.get();
		let channel_id = this.rechargeChannel.selected;
		if (account && amount && channel_id) {
			let loader = this.loadingCtrl.create({ content: "正在提交..." });
			loader.present();
			let url = `/fund/recharge_bank?tk=${token}`;
			let params = `unique_requestId=${unique_requestId}&pay_amount=${amount}&member_bank_account=${account}&channel_id=${channel_id}`
			this.HttpService.post(url, params).subscribe((res: Response) => {
				loader.dismiss();
				if (res['errorcode'] == 0) {
					let alert = this.alertCtrl.create({
						subTitle: '您的充值申请，已成功提交!',
						buttons: ['确认']
					});
					alert.present();
				}else{
					this.httpErrorHandle(res)
				}
			})
		} else {
			let alert = this.alertCtrl.create({
				subTitle: '付款账号、充值金额,充值渠道不能为空!',
				buttons: ['确认']
			});
			alert.present();
		}
	}

	withdrawClickEvent() {   //提现按钮点击事件
		let token = window.localStorage.getItem('token');
		let { amount, payPwd } = this.withDrawDatas.form;
		let unique_requestId = this.uuid.get();
		let url = `/fund/withdraw?tk=${token}`;
		let params = `unique_requestId=${unique_requestId}&amount=${amount}&transfer_pwd=${payPwd}`;
		if (amount && payPwd) {
			let loader = this.loadingCtrl.create({ content: "正在提交..." });
			loader.present();
			this.HttpService.post(url, params).subscribe((res: Response) => {
				loader.dismiss();
				if (res['errorcode'] == 0) {
					let alert = this.alertCtrl.create({
						subTitle: '您的充值申请，已成功提交!',
						buttons: ['确认']
					});
					alert.present();
				}else{
					this.httpErrorHandle(res)
				}
			})
		} else {
			let alert = this.alertCtrl.create({
				subTitle: '提现金额、提现密码不能为空!',
				buttons: ['确认']
			});
			alert.present();
		}
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
