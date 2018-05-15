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
	public pk10ActiveType:any = 'nums';
	public todayNoHistoryData:any;
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
			if(res['history'].length==0){
				this.todayNoHistoryData = true;
			}else{this.todayNoHistoryData=false}
			loader.dismiss();
			let _history = [];
			if(res['errorcode']==0){
				for(let i=0;i<res['history'].length;i++){
					res['history'][i]['opentime_hm'] = this.getHM(res['history'][i].opentime)
					if(res['gamekey']=='cqssc'){
						res['history'][i]['composeHistory']=this.compose(gamekey,res['history'][i].opencode);
					}else if(res['gamekey']=='bjpk10'||res['gamekey']=='xyft'){
						res['history'][i]['composeHistory']=this.compose2(gamekey,res['history'][i].opencode);
					}else if(res['gamekey']=='hklhc'){
						res['history'][i]['opencode_ary'] = this.compose3(res['history'][i]['opencode'],res['history'][i]['zodiac']);
					}
				}
				this.historyData = res['history'];
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
	compose2(gamekey,opencode){
		let _history = this.gamesProvider.getOpencodeNums(gamekey,opencode);
		_history['bigSamll'] = [
			_history['codes']['冠军']['大小'],
			_history['codes']['亚军']['大小'],
			_history['codes']['第3名']['大小'],
			_history['codes']['第4名']['大小'],
			_history['codes']['第5名']['大小'],
			_history['codes']['第6名']['大小'],
			_history['codes']['第7名']['大小'],
			_history['codes']['第8名']['大小'],
			_history['codes']['第9名']['大小'],
			_history['codes']['第10名']['大小']
		]
		_history['singleDouble'] = [
			_history['codes']['冠军']['单双'],
			_history['codes']['亚军']['单双'],
			_history['codes']['第3名']['单双'],
			_history['codes']['第4名']['单双'],
			_history['codes']['第5名']['单双'],
			_history['codes']['第6名']['单双'],
			_history['codes']['第7名']['单双'],
			_history['codes']['第8名']['单双'],
			_history['codes']['第9名']['单双'],
			_history['codes']['第10名']['单双']
		]
		_history['count'] = [
			_history['codes']['冠亚和']['总和'],
			_history['codes']['冠亚和']['大小'],
			_history['codes']['冠亚和']['单双'],
			_history['codes']['冠军']['龙虎'],
			_history['codes']['亚军']['龙虎'],
			_history['codes']['第3名']['龙虎'],
			_history['codes']['第4名']['龙虎'],
			_history['codes']['第5名']['龙虎'],
		]
		return _history
	}
	compose3(opencode:string,zodiac:string){
		let _opencode = opencode.split(',');
		let _zodiac = zodiac.split(',');
		let _array = [];
		let $redNum = ("1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46").split(',');
        let $blueNum = ("3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48").split(',');
        let $greenNum = ("5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49").split(',');
		for(let i=0;i<_opencode.length;i++){
			let colorr;
			if( $redNum['includes'](_opencode[i])){
				colorr = 'lhc-bgRed'
			}else if($blueNum['includes'](_opencode[i])){
				colorr = 'lhc-bgBlue'
			}else if($greenNum['includes'](_opencode[i])){
				colorr = 'lhc-bgGreen'
			}else{
				colorr = ''
			}
			_array.push({text:_zodiac[i],num:_opencode[i],class:colorr})
		}
		return _array;
	}
	changeGamekey(e){
		this.getHistory_expect();
	}
	changeHisDate(e){
		this.getHistory_expect();
	}
	changeCqsscActiveType(type){
		this.cqsscActiveType = type;
	}
	changePk10ActiveType(type){
		this.pk10ActiveType = type;
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
