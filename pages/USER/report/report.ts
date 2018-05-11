import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { GetDateProvider } from '../../../providers/get-date/get-date';
import { UserBetedListPage } from '../../../pages/USER/user-beted-list/user-beted-list'; //用户中心-已结算货单
@IonicPage()
@Component({
    selector: 'page-report',
    templateUrl: 'report.html',
})
export class ReportPage {
    public tabActive: string = 'today'; //yesterday week lastWeek 
    public UserBetedListPage: any = UserBetedListPage;
    public report: any = {
        loading: true,
        status: false,
        list: []
    };
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public HttpService: HttpServiceProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public getDate: GetDateProvider) {
    }

    ionViewDidLoad() {
        this.getReportData('today')
    }
    changeTab(type) {
        this.tabActive = type;
        this.getReportData(type);
    }
    queryCurrentOrder(order) {
        this.navCtrl.push(UserBetedListPage, { date: order.date })
    }
    getReportData(type) {
        let token = window.localStorage.getItem('token');
        let date_start, date_end;
        if (type == 'today') {
            date_start = this.getDate.today();
            date_end = this.getDate.today();
        } else if (type == 'yesterday') {
            date_start = this.getDate.yesterday();
            date_end = this.getDate.yesterday();
        } else if (type == 'week') {
            date_start = this.getDate.weekStartDate();
            date_end = this.getDate.today();
        } else if (type == 'lastWeek') {
            date_start = this.getDate.lastWeekStartDate();
            date_end = this.getDate.lastWeekEndDate();
        } else { return false }
        let url = `/report/query?date_start=${date_start}&date_end=${date_end}&tk=${token}`;
        this.report.loading = true;
        let loader = this.loadingCtrl.create({ content: "数据加载中..." });
		loader.present();
        this.HttpService.get(url).subscribe((res: Response) => {
            loader.dismiss();
            if (res['errorcode'] == 0) {
                this.report.loading = false;
                if (res['report'].length > 0) {
                    this.report.list = res['report'];
                    this.report.status = true;
                } else {
                    this.report.status = false;
                }
            } else {
                let alert = this.alertCtrl.create({
                    subTitle: res['errormsg'],
                    buttons: ['确认']
                });
                alert.present();
            }
        })
    }
}
