import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service'; 
import { LoginPage } from '../../../pages/login/login'; //登录页
/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
	public LoginPage:any = LoginPage;
	public passwordType:any = 'login';
	public loginForm:any = {
		pwdOld:'',
		pwdNew:'',
		pwdNewRepeat:''
	}
	public transferForm:any = {
		pwdOld:'',
		pwdNew:'',
		pwdLogin:'',
		pwdNewRepeat:''
	}
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
      	public alertCtrl: AlertController,
      	public HttpService:HttpServiceProvider,
      	public toastCtrl: ToastController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PasswordPage');
	}
	changePwdType(type){
		this.passwordType = type;
	}
	changeInput(e,type,key){
		this[type][key] = e;
	}
	submitEvent(formType){
		let token = window.localStorage.getItem('token');
		let toast = this.toastCtrl.create({message: '修改密码成功!',duration: 3000});
		if(formType=='loginForm'){
			let {pwdOld,pwdNew,pwdNewRepeat} = this[formType];
			if(pwdOld.length>0&&pwdNew.length>0&&pwdNew===pwdNewRepeat){
				let url = `/member/password_update?tk=${token}`;
				let params = `pwd_old=${pwdOld}&pwd_new=${pwdNew}`;
				console.log(params)
				this.HttpService.post(url,params).subscribe((res: Response) => {
					if(res['errorcode']==''){
						toast.present();
						window.localStorage.removeItem('token');
						this.navCtrl.push(LoginPage)
					}else{
						let alert = this.alertCtrl.create({
			                subTitle: res['errormsg'],
			                buttons: ['确认']
			            });
			            alert.present();
					}
				})
			}else{
				let alert = this.alertCtrl.create({
	                subTitle: '密码均不能为空、新密码需和重复密码一致',
	                buttons: ['确认']
	            });
	            alert.present();
			}
		}else{
			let {pwdOld,pwdNew,pwdLogin,pwdNewRepeat} = this[formType];
			if(pwdOld.length>0&&pwdNew.length>0&&pwdLogin.length&&pwdNew===pwdNewRepeat){
				let url = `/member/transfer_pwd_update?tk=${token}`;
				let params = `transfer_pwd_old=${pwdOld}&transfer_pwd_new=${pwdNew}&password=${pwdLogin}`;
				this.HttpService.post(url,params).subscribe((res: Response) => {
					if(res['errorcode']==''){
						toast.present();
					}else{
						let alert = this.alertCtrl.create({
			                subTitle: res['errormsg'],
			                buttons: ['确认']
			            });
			            alert.present();
					}
				})
			}else{
				let alert = this.alertCtrl.create({
	                subTitle: '密码均不能为空、新密码需和重复密码一致',
	                buttons: ['确认']
	            });
	            alert.present();
			}
		}
		
	}

}
