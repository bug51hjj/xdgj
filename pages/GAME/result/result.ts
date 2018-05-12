import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { GamesProvider } from '../../../providers/games/games'; 
import { LoginPage } from '../../../pages/login/login'; 

@IonicPage()
@Component({
	selector: 'page-result',
	templateUrl: 'result.html',
})
export class ResultPage {
	public LoginPage:any = LoginPage;
	public historyData:any ;
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public HttpService:HttpServiceProvider,
        public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public gamesProvider:GamesProvider) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ResultPage');
		this.getHistory_expect();
	}
	getHistory_expect(){
		let token = window.localStorage.getItem('token');
		let date = '20180511';
		let gamekey = 'cqssc';
		let url = `/event/history_expect?tk=${token}&gamekey=${gamekey}&date=${date}`;
		this.HttpService.get(url).subscribe((res: Response) => {
			if(res['errorcode']==0){
				this.historyData = this.gamesProvider.getOpencodeNums(gamekey,res['history']);
				console.log(this.historyData)
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
