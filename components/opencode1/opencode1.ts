import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GetDateProvider } from '../../providers/get-date/get-date';
import { LoginPage } from '../../pages/login/login';
@Component({
	selector: 'opencode1',
	templateUrl: 'opencode1.html'
})
export class Opencode1Component {
	private LoginPage:any = LoginPage;
	private timer;
	public present:any = {"expect": "","now": "","opentime": "","opentime_remaining": "","opentimestamp": "","start_buytime": "","start_buytimestamp": "","start_remaining": "stop_buytime","":"","stop_buytimestamp":"","stop_remaining":""};
	public last_opencode:any = {expect:'',opencode:'',opentime:'',opentimestamp:''};
	public converTime:any = {
		opentime_remaining:'',
		stop_remaining:''
	}
	private viewType:number = 1;
	@Input() gameKey:any;
	@Output() changeStop_remaining: EventEmitter<any> = new EventEmitter();
	@Output() setExpect: EventEmitter<any> = new EventEmitter();
	constructor(public navCtrl: NavController,
	public navParams: NavParams,
	public HttpService: HttpServiceProvider,
	public alertCtrl: AlertController,
	public loadingCtrl: LoadingController,
	public getDate: GetDateProvider) {
		
	}
	ngOnInit(){
		this.getExpect(true);
		if(this.gameKey=='cqssc'){
			this.viewType = 1;
		}else if(this.gameKey=='bjpk10'||this.gameKey=='xyft'){
			this.viewType = 2;
		}else{
			this.viewType = 1;
		}
	}
	ngAfterViewInit(){
		this.timer = setInterval(() => {
			this.getExpect(false);
		}, 1000);
	}
	getExpect(init){
		let token = window.localStorage.getItem('token');
		let url = `/event/present_expect?tk=${token}&gamekey=${this.gameKey}`;
		let loader = this.loadingCtrl.create({content: "加载中..."});
		if(init){loader.present()}
		this.HttpService.get(url).subscribe((res: Response) => {
			if(init){loader.dismiss()}
			if(res['errorcode']==0){
				res['last_opencode'].opencode = res['last_opencode'].opencode.split(',');
				this.converTime.opentime_remaining = this.getDate.s_to_hs(res['present'].opentime_remaining);
				this.converTime.stop_remaining = this.getDate.s_to_hs(res['present'].stop_remaining);
				this.changeStop_remaining.emit(res['present'].stop_remaining);
				this.setExpect.emit(this.present.expect);
				this.present = res['present'];
				this.last_opencode = res['last_opencode'];
			}else{
				clearInterval(this.timer);
				this.httpErrorHandle(res);
			}
		})
	}
	ngOnDestroy() {
		if (this.timer) {
		 	clearInterval(this.timer);
		}
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
