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

	constructor(public navCtrl: NavController,
	public loadingCtrl: LoadingController,
	public alertCtrl: AlertController,
	public HttpService: HttpServiceProvider,
	public GamesProvider: GamesProvider) {
	}

	ionViewDidLoad() {
		let token = window.localStorage.getItem('token');

		let url = `/event/game?tk=${token}`;
		let loader = this.loadingCtrl.create({ content: "加载中..." });
		loader.present();
		//加载游戏列表
		this.HttpService.get(url).subscribe((res: Response) => {
			if (res['errorcode'] == 0) {
				console.log(res)
			} else {
				this.httpErrorHandle(res)
			}
			loader.dismiss();
		});
	}

	goPage(pageName, gameName) {
		this.navCtrl.push(pageName, { gameName: gameName })
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
