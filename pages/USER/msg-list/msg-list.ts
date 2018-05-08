import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { MessagePage } from '../../../pages/USER/message/message';
/**
 * Generated class for the MsgListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-msg-list',
  templateUrl: 'msg-list.html',
})
export class MsgListPage {
	public MessagePage:any = MessagePage;
  public messageType:any = 'notice'; // or mail
  public noticeData:any = {page:0,init:true,notice:[]};
  public newsData:any = {page:0,init:true,news:[]};
  constructor(public navCtrl: NavController, public navParams: NavParams,public HttpService:HttpServiceProvider) {}

  ionViewDidLoad() {
      this.getPageData()
  }
  changeMessageType(type){
      this.messageType = type;
  }
	goPage(datas){
  	  this.navCtrl.push(MessagePage,{datas:datas})
  }
  getPageData(){
      let token = window.localStorage.getItem('token');
      let noticePage = this.noticeData.page;
      let newsPage = this.newsData.page;
      let url_notice = `/system/notice?page=${noticePage}`;
      let nul_news = `/system/news?page=${newsPage}`;
      this.HttpService.get(url_notice).subscribe((res: Response) => {
          if(res['errorcode']==""){
              res['init'] = false;
              this.noticeData = res;
              console.log(this.noticeData)
          }else{}
      });
      this.HttpService.get(nul_news).subscribe((res: Response) => {
          if(res['errorcode']==""){
              res['init'] = false;
              this.newsData = res;
              console.log(this.newsData)
          }else{}
      });
  }
}
