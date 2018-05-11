import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { LoginPage } from '../../../pages/login/login';

/**
 * Generated class for the BankInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bank-info',
    templateUrl: 'bank-info.html',
})
export class BankInfoPage {
    public LoginPage: any = LoginPage;
    bankInfo: any = {
        loading: true,
        status: false,
        data: {}
    }
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public HttpService: HttpServiceProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        this.getBankInfo()
    }
    getBankInfo() {
        let token = window.localStorage.getItem('token');
        let url = `/member/bank_account?tk=${token}`;
        this.bankInfo.loading = true;
        let loader = this.loadingCtrl.create({ content: "数据加载中..." });
		loader.present();
        this.HttpService.get(url).subscribe((res: Response) => {
            loader.dismiss();
            this.bankInfo.loading = false;
            if (res['errorcode'] == '' && res['bank_id'] == "") {
                this.bankInfo.status = false;
                this.bankInfo.data = res;
            } else if (res['errorcode'] == '' && res['bank_id'] != "") {
                this.bankInfo.status = true;
                this.bankInfo.data = res;
            } else {

            }
        });
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
