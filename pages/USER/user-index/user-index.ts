import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

import { AccountPage } from '../../../pages/USER/account/account';
import { PasswordPage } from '../../../pages/USER/password/password';
import { MsgListPage } from '../../../pages/USER/msg-list/msg-list';
import { BankDealPage } from '../../../pages/USER/bank-deal/bank-deal';
import { BankInfoPage } from '../../../pages/USER/bank-info/bank-info';
import { ReportPage } from '../../../pages/USER/report/report';
import { CustomeSePage } from '../../../pages/USER/custome-se/custome-se';
import { LoginPage } from '../../../pages/login/login';
/**
 * Generated class for the UserIndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-index',
  templateUrl: 'user-index.html',
})
export class UserIndexPage {
  public AccountPage:any = AccountPage;
	public PasswordPage:any = PasswordPage;
	public MsgListPage:any = MsgListPage;
  public BankDealPage:any = BankDealPage;
  public BankInfoPage:any = BankInfoPage;
  public ReportPage:any = ReportPage;
  public CustomeSePage:any = CustomeSePage;
  public LoginPage:any = LoginPage;

  public userInformation:any = {
      username:'加载中...',
      amount:'加载中...',
      realname:'加载中...'
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public HttpService:HttpServiceProvider,
    public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
      this.getUserData();
  }
  goPage(pageName){
  	this.navCtrl.push(pageName)
  }
  getUserData(){
    let token = window.localStorage.getItem('token');
    let url1 = `/member/amount?tk=${token}`;
    let url2 = `/member/info?tk=${token}`;
    this.HttpService.get(url1).subscribe((res: Response) => {
        this.userInformation.username = res['username'];
        this.userInformation.amount = res['amount'];
    });
    this.HttpService.get(url2).subscribe((res: Response) => {
        this.userInformation.realname = res['realname'];
    });
    
  }
  logout(){
     window.localStorage.removeItem('token');
     this.navCtrl.push(LoginPage);
  }
  shareEvent(){
      var shareLink = document.getElementById('shareLink');
      shareLink['select']();
      document.execCommand("Copy"); 
      let alert = this.alertCtrl.create({
          subTitle: '分享链接已经复制到您的剪贴板！',
          buttons: ['确认']
      });
      alert.present();
  }
}
