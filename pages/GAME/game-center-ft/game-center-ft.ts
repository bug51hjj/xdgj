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
import { GetDateProvider } from '../../../providers/get-date/get-date';
import { noUndefined } from '@angular/compiler/src/util';
@IonicPage()
@Component({
	selector: 'page-game-center-ft',
	templateUrl: 'game-center-ft.html',
})
export class GameCenterFtPage {
	public gameName: string = '游戏名称';  //游戏名称
	public gameKey: string = '游戏ID';
	public gameStructure: any = [{},{},{},{}];  //游戏基本数据结构
	public activeGamePan: any = 'A';  //当前选择的游戏盘区 默认A
	public activeGameType: number = 0;  //当前选择的游戏类型 默认第一个
	public expect:any='';//游戏期数
	public unitsData: any;
	public selectedDatas: any = {list:[],count:0};  //选中的游戏项目
	public buyAmount:any; //购买金额
	public stop_remaining: any = {};//封盘
	public memberAmount:any = 0; //余额
	public getAmountTimer;
	public historyData:any;
	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public actionSheetCtrl: ActionSheetController,
		public gamesProvider: GamesProvider,
		public HttpService: HttpServiceProvider,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public uuidProvider:UuidProvider,
		public getDateProvider:GetDateProvider) {
		this.gameName = this.navParams.get('gameParams').gamename;
		this.gameKey = this.navParams.get('gameParams').gamekey;
	}

	ionViewDidLoad() {
		this.getMemberAmount();
		this.getGamePrizes();
		this.getFtChanglong();
		this.getAmountTimer = setInterval(()=>{
			this.getMemberAmount();
		},5000)
	}
	ionViewWillUnload(){
		if(this.getAmountTimer){clearInterval(this.getAmountTimer)}
	}
	getGamePrizes() {
		let token = window.localStorage.getItem('token');
		let { gameKey, activeGamePan } = this;
		let url = `/event/price_list?tk=${token}&gamekey=${gameKey}&pan=${activeGamePan}`;
		let loader = this.loadingCtrl.create({content: "加载中..."});
		loader.present();
		this.HttpService.get(url).subscribe((res: Response) => {
			loader.dismiss();
			if(res['errorcode']==0){
				this.gameStructure = this.gamesProvider.getPlayPrizes(res, this.gameKey);
				this.unitsData = this.gameStructure[this.activeGameType];
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
	getFtChanglong(){
		let token = window.localStorage.getItem('token');
		// let date = this.getDateProvider.today();
		let date = '20180515';
		let url = `/event/history_expect?tk=${token}&gamekey=${'bjft'}&date=${date}`;
		this.HttpService.get(url).subscribe((res: Response) => {
			if(res['errorcode']==0){
				let tempHistoryData = this.gamesProvider.getFtLong(res);
				for (let key in tempHistoryData) {
					let maxLength = tempHistoryData[key][0].length;
					tempHistoryData[key].map(item=>{
						if(item.length<=maxLength){
							for (let index = 0; index < maxLength; index++) {
								if(item[index]==undefined){
									item[index] = {num: -1, code: -1}
								}
							}
						}
					})
				}
				this.historyData = tempHistoryData;
			}
		})
		let ftBoxOut = document.getElementById('ft-box-out');
		ftBoxOut.scrollLeft = 2000;
	}
	changeActiveGameType(type){
		this.activeGameType = type;
		this.cencelSelected(false);
	}
	changeStop_remaining(e) {
		this.stop_remaining = e;
	}
	setExpect(e){
		this.expect = e;
	}
	changeBuyAmount(e){
		this.buyAmount = e;
	}
	goPage(pageName) {
		this.navCtrl.push(pageName)
	}
	goHome() {
		this.navCtrl.pop()
	}
	selectItem(itemAry){
		itemAry['checked'] = !itemAry['checked'];
		this.changeSelectedList();
	}
	selectItem_gg(itemAry,index){
		let currentUnist = this.gameStructure[this.activeGameType].units[index];
		let tempItemChecked = itemAry['checked'];
		for(let key in currentUnist.nums){
			currentUnist.nums[key]['checked'] = false;
		}
		itemAry['checked'] = !tempItemChecked;
		this.changeSelectedList_gg();
	}
	checkOrder(){
		if(this.selectedDatas.count==0){this.httpErrorHandle({errormsg:'无下注项目'});return false;}
		if(this.buyAmount<2){
			this.httpErrorHandle({errormsg:'购买金额需要大于2'})
			return false;
		}
		let profileModal = this.modalCtrl.create(ConfirmOrderPage, { selectedDatas: JSON.stringify(this.selectedDatas),buyAmount:this.buyAmount }, {
			showBackdrop: true,
			enableBackdropDismiss: true
		});
		profileModal.onDidDismiss(result => {
			if(result){this.orderBuy()}
		});
		profileModal.present();
	}
	changeSelectedList(){
		this.selectedDatas = {list:[],count:0};
		let tempAry = []
		this.gameStructure.map(_gameStructure=>{
			_gameStructure.units.map(_nunits=>{
				for(let key in _nunits.nums){
					if(_nunits.nums[key]['checked']){
						tempAry.push(_nunits.nums[key])
					}
				}
			})
		})
		this.selectedDatas = {list:tempAry,count:tempAry.length}
	}
	changeSelectedList_gg(){
		this.selectedDatas = {list:[],count:0};
		let tempAry = []
		this.gameStructure.map(_gameStructure=>{
			_gameStructure.units.map(_nunits=>{
				for(let key in _nunits.nums){
					if(_nunits.nums[key]['checked']){
						tempAry.push(_nunits.nums[key])
					}
				}
			})
		})

		this.selectedDatas = {list:tempAry,count:tempAry.length>1?1:0}
	}
	cencelSelected(neddTips){
		if(neddTips){
			let alert = this.alertCtrl.create({
				subTitle: '确定取消所有选中项?',
				buttons: [{text:'取消'},{
					text: '确定',
					handler: () => {
						this.gameStructure.map(_gameStructure=>{
							_gameStructure.units.map(_nunits=>{
								for(let key in _nunits.nums){
									_nunits.nums[key]['checked'] = false;
								}
							})
						})
						this.selectedDatas = {list:[],count:0};
					}
				}]
			});
			alert.present()
		}else{
			this.gameStructure.map(_gameStructure=>{
				_gameStructure.units.map(_nunits=>{
					for(let key in _nunits.nums){
						_nunits.nums[key]['checked'] = false;
					}
				})
			})
			this.selectedDatas = {list:[],count:0};
		}
	}
	orderBuy(){
		let token = window.localStorage.getItem('token');
		let unique_requestId = this.uuidProvider.get();
		let gamekey = this.gameKey;
		let pan = this.activeGamePan;
		let expect = this.expect;
		let orders = [];
		this.selectedDatas.list.map(item=>{
			let temp = {
				type:item.type,
				play_method:item.play_method,
				price:item.price,
				amount:this.buyAmount
			};
			orders.push(temp);
		})
		
		let url = `/order/buy?tk=${token}`;
		let params = `unique_requestId=${unique_requestId}&gamekey=${gamekey}&expect=${expect}&pan=${pan}&orders=${JSON.stringify(orders)}`
		let loader = this.loadingCtrl.create({content: "加载中..."});
		loader.present();
		this.HttpService.post(url,params).subscribe((res: Response) => {
			loader.dismiss();
			if(res['errorcode']==0){
				this.httpErrorHandle({errormsg:'下单成功!'});
				this.getMemberAmount();
				this.cencelSelected(false);
				this.buyAmount = 0;
			}else{
				this.httpErrorHandle(res)
			}
		})
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
					text: '取消',
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
