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
      this.getNoticeList();
      this.getNewsList();
      // let reqAry = [
      //     {url:'/member/password_update?tk=63dc2b9dd5dc0947d534d2ea92f98ea6',params:'pwd_old=123456&pwd_new=123456'},
      //     {url:'/member/password_update?tk=63dc2b9dd5dc0947d534d2ea92f98ea6',params:'pwd_old=123456&pwd_new=123456'},
      // ]
      // this.HttpService.posts(reqAry).subscribe(
      //     result => {
      //         result.map(item=>{
      //             console.log(item.json())
      //         })
      //     }
      // );
  }
  changeMessageType(type){
      this.messageType = type;
  }
	goPage(datas){
  	  this.navCtrl.push(MessagePage,{datas:datas})
  }
  getPageData(){
      
      
      // let newsPage = this.newsData.page;
      // let url_notice = `/system/notice?page=${noticePage}`;
      // let nul_news = `/system/news?page=${newsPage}`;
      // this.HttpService.get(url_notice).subscribe((res: Response) => {
      //     if(res['errorcode']==""){
      //         res['init'] = false;
      //         this.noticeData = res;
      //     }else{}
      // });
      // this.HttpService.get(nul_news).subscribe((res: Response) => {
      //     if(res['errorcode']==""){
      //         res['init'] = false;
      //         this.newsData = res;
      //     }else{}
      // });
  }
  getNoticeList(){
      let token = window.localStorage.getItem('token');
      let currPage = this.noticeData.page===0?this.noticeData.page:this.noticeData.page+1;
      let url_notice = `/system/notice?page=${currPage}`;
      this.HttpService.get(url_notice).subscribe((res: Response) => {
          if(res['errorcode']==""){
              res['init'] = false;
              if(this.noticeData.page===0){
                  this.noticeData = res;
                  // this.noticeData.notice.concat(res['notice']);
              }else if(res['total_page']>this.noticeData.page){
                  this.noticeData.notice.concat(res['notice']);
              }else {
                 console.log('没有更多了');
              }
              
          }else{}
      });
  }
  getNewsList(){
      let token = window.localStorage.getItem('token');
      let currPage = this.newsData.page===0?this.newsData.page:this.newsData.page+1;
      let url_notice = `/system/news?page=${currPage}`;
      this.HttpService.get(url_notice).subscribe((res: Response) => {
          if(res['errorcode']==""){
              res['init'] = false;
              if(this.newsData.page===0){
                  this.newsData = res;
                  // this.noticeData.notice.concat(res['notice']);
              }else if(res['total_page']>this.newsData.page){
                  this.newsData.notice.concat(res['new']);
              }else {
                 console.log('没有更多了');
              }
              
          }else{}
      });
  }
  doInfinite(infiniteScroll){
    if(this.messageType==='notice'){
        this.getNoticeList();
    }else{
        this.getNewsList();
    }
    infiniteScroll.complete();
  }
  doRefresh(refresh){
      refresh.complete();
  }
}
