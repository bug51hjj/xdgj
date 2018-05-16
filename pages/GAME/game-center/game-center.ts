import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { UuidProvider } from '../../../providers/uuid/uuid';
import { ReportPage } from '../../../pages/USER/report/report'; //投注报表
import { LoginPage } from '../../../pages/login/login'; 
import gameDatas from '../../../assets/data/gameData.js';
import { GamesProvider } from '../../../providers/games/games';
import { ComponentsModule } from '../../../components/components.module';
import { ConfirmOrderPage } from '../../../pages/GAME/confirm-order/confirm-order';
import { GameSelect_01Component } from '../../../components/game-select-01/game-select-01';
@IonicPage()
@Component({
	selector: 'page-game-center',
	templateUrl: 'game-center.html',
})
export class GameCenterPage {
	@ViewChild(GameSelect_01Component) gameSelect_01:GameSelect_01Component;
	public activeIonicContent:number = 0;
	public ReportPage: any = ReportPage;
	public gameName: string = '游戏名称';  //游戏名称
	public gameKey: string = '游戏ID';
	public gameStructure: any;  //游戏基本数据结构
	public activeGameType: number = 0;  //当前选择的游戏类型 默认第一个
	public activeGamePan: any = 'A';  //当前选择的游戏盘区 默认A
	public expect:any='';//游戏期数
	public unitsData: any;
	public selectedDatas: any = {list:[],type:'',count:0};  //选中的游戏项目
	public buyAmount:any; //购买金额
	public stop_remaining: any = {};//封盘
	public memberAmount:any = 0;
	public getAmountTimer;
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
		this.getGamePrizes();
		this.getMemberAmount();
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
	changeActiveIonicContent(type){
		this.activeIonicContent = type;
	}
	changeStop_remaining(e) {
		this.stop_remaining = e;
	}
	changeSelectedList(e) {
		this.selectedDatas= e;
	}
	changeBuyAmount(e){
		this.buyAmount = e;
	}
	setExpect(e){
		this.expect = e;
	}
	goPage(pageName) {
		this.navCtrl.push(pageName)
	}
	goHome() {
		this.navCtrl.pop()
	}
	gameKeyClickEvent(index) {
		this.activeGameType = index;
		this.unitsData = this.gameStructure[index];
	}
	checkOrder() {
		if(this.selectedDatas.list.length==0){
			this.httpErrorHandle({errormsg:'您还未选择购买项目!'})
			return false;
		}
		if(this.selectedDatas.type=='hklhchx'&&this.selectedDatas.list.length!=this.selectedDatas.limit){
			this.httpErrorHandle({errormsg:`选择数量应该为${this.selectedDatas.limit}个`});
			return false;
		}
		if(this.selectedDatas.type=='hklhccomb'&&this.selectedDatas.list.length<this.selectedDatas.comb){
			this.httpErrorHandle({errormsg:`至少选择${this.selectedDatas.comb}个`});
			return false;
		}
		if(this.selectedDatas.type=='pk10hhgg'&&this.selectedDatas.count==0){
			this.httpErrorHandle({errormsg:`至少选择两项`});
			return false;
		}
		if(this.buyAmount<2){
			this.httpErrorHandle({errormsg:'单注金额不能低于2'})
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
		// console.log(token);console.log(unique_requestId);console.log(gamekey)
		// console.log(pan);console.log(expect);console.log(orders)
		let loader = this.loadingCtrl.create({content: "加载中..."});
		loader.present();
		this.HttpService.post(url,params).subscribe((res: Response) => {
			loader.dismiss();
			if(res['errorcode']==0){
				this.httpErrorHandle({errormsg:'下单成功!'});
				this.getMemberAmount();
				this.gameSelect_01.cencelSelected(false);
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
