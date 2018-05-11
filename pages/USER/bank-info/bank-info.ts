import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

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
    bankInfo:any = {
        loading:true,
        status:false,
        data:{}
    }
    constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public HttpService:HttpServiceProvider,
      public alertCtrl: AlertController,) {
    }

    ionViewDidLoad() {
      this.getBankInfo()
    }
    getBankInfo(){
      let token = window.localStorage.getItem('token');
      let url = `/member/bank_account?tk=${token}`;
      this.bankInfo.loading = true;
      this.HttpService.get(url).subscribe((res: Response) => {
          console.log(res)
          this.bankInfo.loading = false;
          if(res['errorcode']==''&&res['bank_id']==""){
              this.bankInfo.status = false;
              this.bankInfo.data = res;
          }else if(res['errorcode']==''&&res['bank_id']!=""){
              this.bankInfo.status = true;
              this.bankInfo.data = res;
          }else{

          }
      });
    }

}
