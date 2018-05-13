import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { GamesProvider } from '../../../providers/games/games'; 
import { GetDateProvider } from '../../../providers/get-date/get-date'; 
import { LoginPage } from '../../../pages/login/login'; 

@IonicPage()
@Component({
	selector: 'page-result',
	templateUrl: 'result.html',
})
export class ResultPage {
	public LoginPage:any = LoginPage;
	public historyData:any;
	public gamekey:any;
	public hisDate:any;
	public cqsscActiveType:any = 'nums';
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public HttpService:HttpServiceProvider,
        public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public gamesProvider:GamesProvider,
		public dateProvider:GetDateProvider) {
			this.gamekey = 'cqssc';
			this.hisDate = this.dateProvider.today2();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ResultPage');
		this.getHistory_expect();
	}
	getHistory_expect(){
		let token = window.localStorage.getItem('token');
		let date = this.hisDate.split('-').join('');
		let gamekey = this.gamekey;
		let url = `/event/history_expect?tk=${token}&gamekey=${gamekey}&date=${date}`;
		let loader = this.loadingCtrl.create({content: "正在登录."});
		loader.present();
		this.HttpService.get(url).subscribe((res: Response) => {
			loader.dismiss();
			let _history = [];
			if(res['errorcode']==0){
				for(let i=0;i<res['history'].length;i++){
					res['history'][i]['opentime_hm'] = this.getHM(res['history'][i].opentime)
					if(res['gamekey']=='cqssc'){
						res['history'][i]['composeHistory']=this.compose(gamekey,res['history'][i].opencode);
					}else if(res['gamekey']=='bjpk10'||res['gamekey']=='xyft'){
						res['history'][i]['composeHistory']=this.gamesProvider.getOpencodeNums(gamekey,res['history'][i].opencode);
					}
				}
				this.historyData = res['history'];
				console.log(this.historyData)
				// this.compose(_history)
			}else{
				this.httpErrorHandle(res)
			}
		})
	}
	compose(gamekey,opencode){
		let _history = this.gamesProvider.getOpencodeNums(gamekey,opencode);
		_history['bigSamll'] = [
			_history['codes']['第1球']['大小'],
			_history['codes']['第2球']['大小'],
			_history['codes']['第3球']['大小'],
			_history['codes']['第4球']['大小'],
			_history['codes']['第5球']['大小']
		]
		_history['singleDouble'] = [
			_history['codes']['第1球']['单双'],
			_history['codes']['第2球']['单双'],
			_history['codes']['第3球']['单双'],
			_history['codes']['第4球']['单双'],
			_history['codes']['第5球']['单双']
		]
		_history['count'] = [
			_history['codes']['总和']['总和'],
			_history['codes']['总和']['单双'],
			_history['codes']['总和']['大小'],
			_history['codes']['总和']['龙虎'],
			_history['codes']['前三']['类型'],
			_history['codes']['中三']['类型'],
			_history['codes']['后三']['类型'],
		]
		return _history
	}
	changeGamekey(e){
		this.gamekey = e;
		this.getHistory_expect();
	}
	changeHisDate(e){
		// this.cqsscActiveType = e;
		this.getHistory_expect();
	}
	changeCqsscActiveType(type){
		this.cqsscActiveType = type;
	}
	getHM(timeStr:string){
		return timeStr.substr(9,5);
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
