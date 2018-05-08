import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { UserIndexPage } from '../USER/user-index/user-index';
import { HttpServiceProvider } from '../../providers/http-service/http-service'; 

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	public HomePage:any = HomePage;
  public UserIndexPage:any = UserIndexPage;
  public username:any=null;
  public password:any=null;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public HttpService:HttpServiceProvider,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController){
      if(window.localStorage.getItem('username')){
          this.username = window.localStorage.getItem('username');
      }
  }
  loginEvent(){
      let {username,password} = this;
      if(username&&password){
          //显示正在登录loding
          let loader = this.loadingCtrl.create({
              content: "正在登录."
          });
          loader.present();
          //记录登录用户名，下次自动填写
          window.localStorage.setItem('username',username);
          //拼接请求参数
          let params = `username=${username}&password=${password}&locale=zh_cn`;
          this.HttpService.post("/member/login?tk=test",params).subscribe((res: Response) => {
              if(res['errorcode']==""){//返回信息无错误代码表示登录成功
                  window.localStorage.setItem('token',res['token']); //存储token
                  this.navCtrl.push(HomePage);  //跳转首页
              }else{ //返回信息有错误代码，显示错误信息
                let alert = this.alertCtrl.create({
                    subTitle: res['errormsg'],
                    buttons: ['确认']
                });
                alert.present();
              }
              loader.dismiss();
          });
      }else{
          let alert = this.alertCtrl.create({
            subTitle: '账号、密码不能为空!',
            buttons: ['确认']
          });
          alert.present();
      }
  }
  changeUsername(e){
    this.username = e;
  }
  changePassword(e){
    this.password = e;
  }
}
