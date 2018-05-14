import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { MessagePage } from '../../../pages/USER/message/message';
import { LoginPage } from '../../../pages/login/login';
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
    public MessagePage: any = MessagePage;
    public messageType: any = 'notice'; // or mail
    public noticeData: any = { page: 0, init: true, notice: [] };
    public mailData: any = { page: 0, init: true, news: [] };
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public HttpService: HttpServiceProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) { }

    ionViewDidLoad() {
        this.messageInit(()=>{})
    }
    changeMessageType(type) {
        this.messageType = type;
    }
    goPage(datas) {
        this.navCtrl.push(MessagePage, { datas: datas })
    }
    messageInit(refreshCallback){
        let token = window.localStorage.getItem('token');
        let urls = [
            {url:`/system/notice?page=0&tk=${token}`},
            {url:`/member/pm?page=0&tk=${token}`}
        ];
        let loader = this.loadingCtrl.create({ content: "数据加载中..." });
        loader.present();
        this.HttpService.gets(urls).subscribe(result => {
            if(typeof refreshCallback == 'function'){refreshCallback()}
            loader.dismiss();
            result.map(item=>{
                let res = item['json']();
                if(res.errorcode === 0){
                    console.log(res)
                    if('notice' in res){
                        res['notice'].map(noticeItem=>{
                            noticeItem.title = decodeURIComponent(noticeItem.title);
                            noticeItem.content = decodeURIComponent(noticeItem.content);
                        })
                        this.noticeData = res;
                    }
                    if('pm' in res){
                        res['pm'].map(pmItem=>{
                            pmItem.title = decodeURIComponent(pmItem.title);
                            pmItem.content = decodeURIComponent(pmItem.content);
                        })
                        this.mailData = res;
                    }
                }else{
                    this.httpErrorHandle(res)
                }
            })       
        })
    }
    getNoticeData(type){
        let token = window.localStorage.getItem('token');
        let page = this.noticeData.page;
        if(type=='prev'){
            if(page-1>1){
                var url = `/system/notice?page=${page-1}&tk=${token}`;
            }else{
                this.httpErrorHandle({errormsg:'已经是第一条'})
            }
        }else{ //next
            if(page+1<this.noticeData.total_page){
                var url = `/system/notice?page=${page+1}&tk=${token}`;
            }else{
                this.httpErrorHandle({errormsg:'已经是最后一条'})
            }
        }
        
        if(url){
            let loader = this.loadingCtrl.create({ content: "数据加载中..." });
            loader.present();
            this.HttpService.get(url).subscribe((res: Response) => {
                loader.dismiss();
                if (res['errorcode']==0) {
                    this.noticeData = res;
                }else{this.httpErrorHandle(res)}
            })
        }
    }
    getMailData(type){
        let token = window.localStorage.getItem('token');
        let page = this.mailData.page;
        if(type=='prev'){
            if(page-1>1){
                var url = `/member/pm?page=${page-1}&tk=${token}`;
            }else{
                this.httpErrorHandle({errormsg:'已经是第一条'})
            }
        }else{ //next
            if(page+1<this.mailData.total_page){
                var url = `/member/pm?page=${page+1}&tk=${token}`;
            }else{
                this.httpErrorHandle({errormsg:'已经是最后一条'})
            }
        }
        
        if(url){
            let loader = this.loadingCtrl.create({ content: "数据加载中..." });
            loader.present();
            this.HttpService.get(url).subscribe((res: Response) => {
                loader.dismiss();
                if (res['errorcode']==0) {
                    this.mailData = res;
                }else{this.httpErrorHandle(res)}
            })
        }
    }
    doRefresh(refresh) {
        this.messageInit(()=>{refresh.complete()});
    }

    httpErrorHandle(result) {
        let errorcode = result.errorcode;
        let errormsg = result.errormsg;
        let alert;
        if (errorcode == 103) {
            alert = this.alertCtrl.create({
                subTitle: '登录信息已过期，请重新登录!',
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
