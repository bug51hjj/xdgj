import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { LoginPage } from '../../../pages/login/login'; //登录页
/**
 * Generated class for the BankAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-add',
  templateUrl: 'bank-add.html',
})
export class BankAddPage {
  public LoginPage:any = LoginPage;
    public bankcardForm:any = {
      bank_type:{
          loading:true,
          status:false,
          selected:'',
          list:[]
      },
      bank_of_deposit:'',
      bank_account:'',
      bank_account_name:''
    }
    constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public HttpService:HttpServiceProvider,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController) {
    }
    ionViewDidLoad() {
        this.getBankTypes()
    }
    getBankTypes(){
      let token = window.localStorage.getItem('token');
      let url = `/system/banktype?tk=${token}`;
      this.bankcardForm.bank_type.loading = true;
      this.HttpService.get(url).subscribe((res: Response) => {
          this.bankcardForm.bank_type.loading = false;
          if(res['errorcode']==''){
              this.bankcardForm.bank_type.list = res['banktype'];
              this.bankcardForm.bank_type.selected = res['banktype'][0].bank_id;
              if(res['banktype'].length>0){
                  this.bankcardForm.bank_type.status = true;
              }
          }
      })
    }
    changeInput(val,type){
        this.bankcardForm[type] = val;
    }
    submitEvent(){
        let token = window.localStorage.getItem('token');
        let {bank_of_deposit,bank_account,bank_account_name} = this.bankcardForm;
        let bank_id,bank_name;
        let bankType = this.bankcardForm.bank_type;
        bankType.list.map(item=>{
            if(item.bank_id==bankType.selected){
              bank_id = item.bank_id;
              bank_name = item.bank_name;
            }
        })
        if(bank_id&&bank_name&&bank_of_deposit&&bank_account_name&&bank_account){
            let url = `/member/bank_account_set?tk=${token}`;
            let params = `bank_id=${bank_id}&bank_name=${bank_name}&bank_of_deposit=${bank_of_deposit}&bank_account_name=${bank_account_name}&bank_account=${bank_account}`
            this.HttpService.post(url,params).subscribe((res: Response)=>{
                if(res['errorcode']==''){
                  let alert = this.alertCtrl.create({
                      subTitle: "绑定成功",
                      buttons: ['确认']
                  });
                  alert.present();
                }else if(res['errorcode']==100){
                    alert('登录超时,请重新登录!');
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
              subTitle: '绑定方式、金额、银行账号、开户人姓名不能为空!',
              buttons: ['确认']
            });
            alert.present();
        }

    }

}
