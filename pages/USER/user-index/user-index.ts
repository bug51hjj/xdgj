import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
    public AccountPage: any = AccountPage;
    public PasswordPage: any = PasswordPage;
    public MsgListPage: any = MsgListPage;
    public BankDealPage: any = BankDealPage;
    public BankInfoPage: any = BankInfoPage;
    public ReportPage: any = ReportPage;
    public CustomeSePage: any = CustomeSePage;
    public LoginPage: any = LoginPage;

    public userInformation: any = {
        username: '加载中...',
        amount: '加载中...',
        realname: '加载中...'
    }
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public HttpService: HttpServiceProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        this.getUserData();
    }
    goPage(pageName) {
        this.navCtrl.push(pageName)
    }
    getUserData() {
        let token = window.localStorage.getItem('token');
        let urls = [{ url: `/member/amount?tk=${token}` }, { url: `/member/info?tk=${token}` }]
        let loader = this.loadingCtrl.create({ content: "数据加载中..." });
        loader.present();
        this.HttpService.gets(urls).subscribe(
            result => {
                loader.dismiss();
                result.map(item => {
                    let res = item['json']();
                    if(res.errorcode==0){
                        if ('amount' in res) { this.userInformation.amount = res.amount }
                        if ('username' in res) { this.userInformation.username = res.username }
                        if ('realname' in res) { this.userInformation.realname = res.realname }
                    }else{
                        this.httpErrorHandle(res)
                    }
                    
                })
            }
        );
    }
    logout() {
        let confirm = this.alertCtrl.create({
            title: '确定退出登录?',
            buttons: [
                { text: '取消' },
                {
                    text: '确定',
                    handler: () => {
                        window.localStorage.removeItem('token');
                        this.navCtrl.push(LoginPage);
                    }
                }
            ]
        });
        confirm.present();
    }
    shareEvent() {
        var shareLink = document.getElementById('shareLink');
        shareLink['select']();
        document.execCommand("Copy");
        let alert = this.alertCtrl.create({
            subTitle: '分享链接已经复制到您的剪贴板！',
            buttons: ['确认']
        });
        alert.present();
    }
    httpErrorHandle(result) {
        let errorcode = result.errorcode;
        let errormsg = result.errormsg;
        let alert;
        if (result == 100) {
            alert = this.alertCtrl.create({
                subTitle: '登录超时请重新登录!',
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
