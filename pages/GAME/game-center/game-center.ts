import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController,LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ReportPage } from '../../../pages/USER/report/report'; //投注报表

import gameDatas from '../../../assets/data/gameData.js';
import { GamesProvider } from '../../../providers/games/games';

@IonicPage()
@Component({
	selector: 'page-game-center',
	templateUrl: 'game-center.html',
})
export class GameCenterPage {
	public ReportPage: any = ReportPage;
	public gameName: string = '游戏名称';  //游戏名称
	public gameKey: string = '游戏ID';
	public gameStructure: any;  //游戏基本数据结构
	public activeGameType: number = 0;  //当前选择的游戏类型 默认第一个
	public activeGamePan: any = 'A';  //当前选择的游戏盘区 默认A
	public unitsData:any;
	public selectedList: any = [];  //选中的游戏项目
	public stop_remaining:any = {};//封盘
	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		public actionSheetCtrl: ActionSheetController,
		public gamesProvider:GamesProvider,
        public HttpService: HttpServiceProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
		this.gameName = this.navParams.get('gameParams').gamename;
		this.gameKey = this.navParams.get('gameParams').gamekey;
	}
	ionViewDidLoad() {
		this.getGamePrizes()
	}
	getGamePrizes(){
		let token = window.localStorage.getItem('token');
		let {gameKey,activeGamePan} = this;
		let url = `/event/price_list?tk=${token}&gamekey=${gameKey}&pan=${activeGamePan}`;
		this.HttpService.get(url).subscribe((res: Response) => {
			this.gameStructure = this.gamesProvider.getPlayPrizes(res,this.gameKey);
			this.unitsData = this.gameStructure[this.activeGameType];
		})
	}
	changeStop_remaining(e){
		this.stop_remaining = e;
	}
	changeSelectedList(e) {
		this.selectedList = e;
		console.log(this.selectedList)
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
		console.log(this.selectedList)
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

}
