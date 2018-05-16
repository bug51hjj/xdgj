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
	private timer; //定时请求
	private timer2;	//计算请求
	private timer2_open:any = 0;
	private timer2_stop:any = 0;
	public present:any = {"expect": "","now": "","opentime": "","opentime_remaining": "","opentimestamp": "","start_buytime": "","start_buytimestamp": "","start_remaining": "stop_buytime","":"","stop_buytimestamp":"","stop_remaining":""};
	public last_opencode:any = {expect:'',opencode:'',opentime:'',opentimestamp:'',zodiac:[]};
	public last_opencode_way:any = true;
	public last_opencode_ft_cir:any = [];
	public converTime:any = {
		opentime_remaining:'加载中',
		stop_remaining:'加载中'
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
		}else if(this.gameKey=='hklhc'){
			this.viewType = 3;
		}else if(this.gameKey=='bjft'){
			this.viewType = 4;
		}else if(this.gameKey=='cqft'){
			this.viewType = 5;
		}
	}
	ngAfterViewInit(){
		this.timer = setInterval(() => {
			this.getExpect(false);
		}, 5000);
		// console.log(this.getDate.s_to_dhms(1147))
	}
	getExpect(init){
		let token = window.localStorage.getItem('token');
		let url = `/event/present_expect?tk=${token}&gamekey=${this.gameKey}`;
		let loader = this.loadingCtrl.create({content: "加载中..."});
		if(init){loader.present()}
		this.HttpService.get(url).subscribe((res: Response) => {
			if(init){loader.dismiss()}
			if(res['errorcode']==0){
				if (this.timer2) {clearInterval(this.timer2);}
				this.setTimer2(res['present'].opentime_remaining,res['present'].stop_remaining)
				if(this.gameKey=="cqssc"||this.gameKey=="bjpk10"||this.gameKey=="xyft"){
					res['last_opencode'].opencode = res['last_opencode'].opencode.split(',');
					// this.converTime.opentime_remaining = this.getDate.s_to_hs(res['present'].opentime_remaining);
					// this.converTime.stop_remaining = this.getDate.s_to_hs(res['present'].stop_remaining);
					// this.changeStop_remaining.emit(res['present'].stop_remaining);
					this.setExpect.emit(this.present.expect);
					this.present = res['present'];
					this.last_opencode = res['last_opencode'];
				}else if(this.gameKey=='hklhc'){
					res['last_opencode'].opencode = res['last_opencode'].opencode.split(',');
					res['last_opencode'].zodiac = res['last_opencode'].zodiac.split(',');
					// this.converTime.opentime_remaining = this.getDate.s_to_dhms(res['present'].opentime_remaining);
					// this.converTime.stop_remaining = this.getDate.s_to_dhms(res['present'].stop_remaining);
					// this.changeStop_remaining.emit(res['present'].stop_remaining);
					this.setExpect.emit(this.present.expect);
					this.present = res['present'];
					this.last_opencode = res['last_opencode'];
				}else if(this.gameKey=='bjft'){
					let opencodeAry = res['last_opencode'].opencode.split(',');
					res['last_opencode'].opencode = opencodeAry;
					let last_opencode_ft_num = (Number(opencodeAry[0])+Number(opencodeAry[1])+Number(opencodeAry[2]))%4;
					this.last_opencode_ft_cir = [];
					for(let i=0;i<last_opencode_ft_num;i++){
						this.last_opencode_ft_cir.push(i)
					}
					// this.converTime.opentime_remaining = this.getDate.s_to_hs(res['present'].opentime_remaining);
					// this.converTime.stop_remaining = this.getDate.s_to_hs(res['present'].stop_remaining);
					// this.changeStop_remaining.emit(res['present'].stop_remaining);
					this.setExpect.emit(this.present.expect);
					this.present = res['present'];
					this.last_opencode = res['last_opencode'];
				}else if(this.gameKey=='cqft'){
					let opencodeAry = res['last_opencode'].opencode.split(',');
					res['last_opencode'].opencode = opencodeAry;
					console.log(opencodeAry)
					let last_opencode_ft_num = (Number(opencodeAry[0])+Number(opencodeAry[1])+Number(opencodeAry[2])+Number(opencodeAry[3])+Number(opencodeAry[4]))%4;
					// console.log(last_opencode_ft_num)
					this.last_opencode_ft_cir = [];
					for(let i=0;i<last_opencode_ft_num;i++){
						this.last_opencode_ft_cir.push(i)
					}
					// this.converTime.opentime_remaining = this.getDate.s_to_hs(res['present'].opentime_remaining);
					// this.converTime.stop_remaining = this.getDate.s_to_hs(res['present'].stop_remaining);
					// this.changeStop_remaining.emit(res['present'].stop_remaining);
					this.setExpect.emit(this.present.expect);
					this.present = res['present'];
					this.last_opencode = res['last_opencode'];
				}
			}else{
				clearInterval(this.timer);
				this.httpErrorHandle(res);
			}
		})
	}
	setTimer2(openTime,stopTime){
		this.timer2_open = openTime;
		this.timer2_stop = stopTime;
		this.changeStop_remaining.emit(this.timer2_stop);
		if(!this.timer2){
		if(this.gameKey === 'hklhc'){
			this.converTime.opentime_remaining = this.getDate.s_to_dhms(this.timer2_open);
			this.converTime.stop_remaining = this.getDate.s_to_dhms(this.timer2_stop);
		}else{
			this.converTime.opentime_remaining = this.getDate.s_to_hs(this.timer2_open);
			this.converTime.stop_remaining = this.getDate.s_to_hs(this.timer2_stop);
		}}
		this.timer2 = setInterval(() => {
			if(this.gameKey === 'hklhc'){
				this.converTime.opentime_remaining = this.getDate.s_to_dhms(this.timer2_open);
				this.converTime.stop_remaining = this.getDate.s_to_dhms(this.timer2_stop);
			}else{
				this.converTime.opentime_remaining = this.getDate.s_to_hs(this.timer2_open);
				this.converTime.stop_remaining = this.getDate.s_to_hs(this.timer2_stop);
			}
			this.timer2_open--;
			this.timer2_stop--;
		}, 1000);
	}
	ngOnDestroy() {
		if (this.timer) {
		 	clearInterval(this.timer);
		}
	}
	changeLast_opencode_way(){
		this.last_opencode_way = !this.last_opencode_way;
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
