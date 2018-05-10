import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
	public accountData:any={
		username:'加载中...',
		realname:'加载中...',
		qq:'加载中...',
		phone:'加载中...',
		amount:'加载中...'
	}
	constructor(public navCtrl: NavController, public navParams: NavParams,public HttpService:HttpServiceProvider) {
		
	}

	ionViewDidLoad() {
		this.getUserData()
	}
	ngOnChanges(){
		
	}
	getUserData(){
	    let token = window.localStorage.getItem('token');
	    let url1 = `/member/amount?tk=${token}`;
	    let url2 = `/member/info?tk=${token}`;
	    this.HttpService.get(url1).subscribe((res: Response) => {
	    	if(res['errorcode']==""){
	    		this.accountData.username = res['username'];
	        	this.accountData.amount = res['amount'];
	    	}else{}
	    });
	    this.HttpService.get(url2).subscribe((res: Response) => {
	    	if(res['errorcode']==""){
	    		this.accountData.realname = res['realname']==""?'未填写':this.accountData.realname = res['realname'];
		        this.accountData.qq = res['qq']==""?'未填写':this.accountData.qq = res['qq'];
				this.accountData.phone = res['phone']==""?'未填写':this.accountData.phone = res['phone'];
	    	}else{
	    		
	    	}
	    });
	    
	  }

}
