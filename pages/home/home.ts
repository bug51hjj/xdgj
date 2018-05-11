<<<<<<< HEAD
import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import {UserIndexPage} from '../../pages/USER/user-index/user-index';
import {BankDealPage} from '../../pages/USER/bank-deal/bank-deal';
import {ReportPage} from '../../pages/USER/report/report';
import {MsgListPage} from '../../pages/USER/msg-list/msg-list';
import {CustomeSePage} from '../../pages/USER/custome-se/custome-se';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import {GamesProvider} from "../../providers/games/games";

import {GameCenterPage} from '../../pages/GAME/game-center/game-center'; //游戏
import {SscGamePage} from '../../pages/GAME/ssc-game/ssc-game';  //游戏-重庆时时彩
import {BjpkGamePage} from '../../pages/GAME/bjpk-game/bjpk-game';  //游戏-北京PK拾
import {FtGamePage} from '../../pages/GAME/ft-game/ft-game';  //游戏-幸运飞艇
import {LhcGamePage} from '../../pages/GAME/lhc-game/lhc-game';  //游戏-重庆时时彩
import {BjftGamePage} from '../../pages/GAME/bjft-game/bjft-game'; //游戏-北京翻摊
import {CqftGamePage} from '../../pages/GAME/cqft-game/cqft-game'; //游戏-重庆翻摊
import {Jnd28GamePage} from '../../pages/GAME/jnd28-game/jnd28-game'; //游戏-加拿大28
=======
import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController,NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { UserIndexPage } from '../../pages/USER/user-index/user-index';
import { BankDealPage } from '../../pages/USER/bank-deal/bank-deal';
import { ReportPage } from '../../pages/USER/report/report';
import { MsgListPage } from '../../pages/USER/msg-list/msg-list';
import { CustomeSePage } from '../../pages/USER/custome-se/custome-se';
import { HttpServiceProvider } from '../../providers/http-service/http-service'; 

import { GameCenterPage } from '../../pages/GAME/game-center/game-center'; //游戏
>>>>>>> 7015d3044b8439c7c36bd36f2ff683ce483e0c87
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
<<<<<<< HEAD
  public LoginPage: any = LoginPage;
  public UserIndexPage: any = UserIndexPage;
  public BankDealPage: any = BankDealPage;
  public ReportPage: any = ReportPage;
  public MsgListPage: any = MsgListPage;
  public CustomeSePage: any = CustomeSePage;
  public SscGamePage: any = SscGamePage;
  public BjpkGamePage: any = BjpkGamePage;
  public FtGamePage: any = FtGamePage;
  public LhcGamePage: any = LhcGamePage;
  public GameCenterPage: any = GameCenterPage;

  public gameList_online: any = {};
=======
	public LoginPage:any = LoginPage;
	public UserIndexPage:any = UserIndexPage;
	public BankDealPage:any = BankDealPage;
	public ReportPage:any = ReportPage;
	public MsgListPage:any = MsgListPage;
	public CustomeSePage:any = CustomeSePage;
	public GameCenterPage:any = GameCenterPage;
>>>>>>> 7015d3044b8439c7c36bd36f2ff683ce483e0c87

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public HttpService: HttpServiceProvider,
              public GamesProvider: GamesProvider) {
    // if(!window.localStorage.getItem('username')){
    // 	this.navCtrl.push(LoginPage)
    // }

  }

  ionViewDidLoad() {
<<<<<<< HEAD
    this.GamesProvider.getLotteries();
    let token = window.localStorage.getItem('token');
    let url = `/event/game?tk=${token}1`;
=======
		let token = window.localStorage.getItem('token');

    let url = `/event/game?tk=${token}`;
>>>>>>> 7015d3044b8439c7c36bd36f2ff683ce483e0c87
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    //加载游戏列表
    this.HttpService.get(url).subscribe((res: Response) => {
      if (res['errorcode'] == "") {
        res['game'].map(item => {
          this.gameList_online[item.gamekey.toString()] = "gamename";
        })
      } else {
        this.httpErrorHandle(res)
      }
      loader.dismiss();
    });
  }

  goPage(pageName, gameName) {
    this.navCtrl.push(pageName, {gameName: gameName})
  }
<<<<<<< HEAD

  doRefresh(refresher) {
    setInterval(() => {
      refresher.complete();
    }, 1000)

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
=======
  goPage(pageName,gameName){
  	this.navCtrl.push(pageName,{gameKey:gameName})
>>>>>>> 7015d3044b8439c7c36bd36f2ff683ce483e0c87
  }

}
