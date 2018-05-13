import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { UuidProvider } from '../../../providers/uuid/uuid';
import { ReportPage } from '../../../pages/USER/report/report'; //投注报表
import { LoginPage } from '../../../pages/login/login';
import gameDatas from '../../../assets/data/gameData.js';
import { GamesProvider } from '../../../providers/games/games';
import { ComponentsModule } from '../../../components/components.module';
import { ConfirmOrderPage } from '../../../pages/GAME/confirm-order/confirm-order';
@IonicPage()
@Component({
	selector: 'page-game-center-ft',
	templateUrl: 'game-center-ft.html',
})
export class GameCenterFtPage {
	public gameName: string = '游戏名称';  //游戏名称
	public gameKey: string = '游戏ID';
	public gameStructure: any;  //游戏基本数据结构
	public activeGamePan: any = 'A';  //当前选择的游戏盘区 默认A
	public activeGameType: number = 0;  //当前选择的游戏类型 默认第一个
	public expect:any='';//游戏期数
	public unitsData: any;
	public selectedList: any = [];  //选中的游戏项目
	public buyAmount:any; //购买金额
	public stop_remaining: any = {};//封盘
	public memberAmount:any = 0; //余额
	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public actionSheetCtrl: ActionSheetController,
		public gamesProvider: GamesProvider,
		public HttpService: HttpServiceProvider,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public uuidProvider:UuidProvider) {
		this.gameName = this.navParams.get('gameParams').gamename;
		this.gameKey = this.navParams.get('gameParams').gamekey;
	}

	ionViewDidLoad() {
		this.getMemberAmount();
		this.getGamePrizes();
	}
	getGamePrizes() {
		let token = window.localStorage.getItem('token');
		let { gameKey, activeGamePan } = this;
		let url = `/event/price_list?tk=${token}&gamekey=${gameKey}&pan=${activeGamePan}`;
		this.HttpService.get(url).subscribe((res: Response) => {
			if(res['errorcode']==0){
				this.gameStructure = this.gamesProvider.getPlayPrizes(res, this.gameKey);
				this.unitsData = this.gameStructure[this.activeGameType];
				console.log(res);
				console.log(this.gameStructure)
			}else{
				this.httpErrorHandle(res)
			}
		})
	}
	getMemberAmount(){
		// memberAmount
		let token = window.localStorage.getItem('token');
		let url = `/member/amount?tk=${token}`;
		this.HttpService.get(url).subscribe((res: Response) => {
			if(res['errorcode']==0){
				this.memberAmount = res['amount'];
			}else{
				this.httpErrorHandle(res)
			}
		})
	}
	changeBuyAmount(e){
		this.buyAmount = e;
		console.log(e)
	}
	goPage(pageName) {
		this.navCtrl.push(pageName)
	}
	goHome() {
		this.navCtrl.pop()
	}
	presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: '请选择要切换的盘',
			buttons: [
				{
					text: 'A盘',
					handler: () => {
						this.activeGamePan = 'A';
						this.getGamePrizes()
					}
				},
				{
					text: 'B盘',
					handler: () => {
						this.activeGamePan = 'B';
						this.getGamePrizes()
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}

	httpErrorHandle(result) {
		let errorcode = result.errorcode;
		let errormsg = result.errormsg;
		let alert;
		if (errorcode == 103) {
			alert = this.alertCtrl.create({
				subTitle: '登录信息已过期，请重新登录!',
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
