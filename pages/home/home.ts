import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { UserIndexPage } from '../../pages/USER/user-index/user-index';
import { BankDealPage } from '../../pages/USER/bank-deal/bank-deal';
import { ReportPage } from '../../pages/USER/report/report';
import { MsgListPage } from '../../pages/USER/msg-list/msg-list';
import { CustomeSePage } from '../../pages/USER/custome-se/custome-se';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { GamesProvider } from "../../providers/games/games";
import { GameCenterPage } from '../../pages/GAME/game-center/game-center'; //游戏
import { GameCenterFtPage } from '../../pages/GAME/game-center-ft/game-center-ft'; //游戏中心 翻摊
import { MessagePage } from '../../pages/USER/message/message'; //用户中心-信息内容
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public LoginPage: any = LoginPage;
	public UserIndexPage: any = UserIndexPage;
	public BankDealPage: any = BankDealPage;
	public ReportPage: any = ReportPage;
	public MsgListPage: any = MsgListPage;
	public CustomeSePage: any = CustomeSePage;
	public GameCenterPage: any = GameCenterPage;

	public username:string;
	public gamesList :any;
	public newsData:any = {title:1};
	constructor(public navCtrl: NavController,
	public loadingCtrl: LoadingController,
	public alertCtrl: AlertController,
	public HttpService: HttpServiceProvider,
	public GamesProvider: GamesProvider) {
		this.username = window.localStorage.getItem('username');
	}

	ionViewDidLoad() {
		let token = window.localStorage.getItem('token');

		let url = `/event/game?tk=${token}`;
		let loader = this.loadingCtrl.create({ content: "加载中..." });
		loader.present();
		//加载游戏列表
		this.HttpService.get(url).subscribe((res: Response) => {
			if (res['errorcode'] == 0) {
				this.gamesList = res['game'];
			} else {
				this.httpErrorHandle(res)
			}
			loader.dismiss();
		});

		//加载新闻
		let url2 = `/system/news?tk=${token}`
		this.HttpService.get(url2).subscribe((res: Response) => {
			let temp = res['new'][0];
			temp.title = decodeURIComponent(temp.title);
			temp.content = decodeURIComponent(temp.content);
			this.newsData = temp;
		})
	}
	gameCenter(gameParams){
		if(gameParams.gamekey=='bjft'||gameParams.gamekey=='cqft'||gameParams.gamekey=='jnd28'){
			this.navCtrl.push(GameCenterFtPage, { gameParams: gameParams })
		}else{
			this.navCtrl.push(GameCenterPage, { gameParams: gameParams })
		}
		
	}
	goPage(pageName, gameParams) {
		this.navCtrl.push(pageName, { gameParams: gameParams })
	}
	goMsgPage(){
		this.navCtrl.push(MessagePage,{datas:this.newsData})
	}
	customer(){
        window.location.href = 'https://chat.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=888676&configID=52793&jid=8386799701&skillId=3159&s=1'
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
