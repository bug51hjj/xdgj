import { Component ,Input } from '@angular/core';
import { NavController,PopoverController,NavParams  } from 'ionic-angular';

import { ReportPage } from '../../pages/USER/report/report'; //投注报表
import { UserBetListPage } from '../../pages/USER/user-bet-list/user-bet-list';//即时投注
import { ResultPage } from '../../pages/GAME/result/result';//开奖结果
import { BankDealPage } from '../../pages/USER/bank-deal/bank-deal';//银行交易
import { RulesPage } from '../../pages/GAME/rules/rules'; //游戏规则
@Component({
  selector: 'game-side-menu',
  templateUrl: 'game-side-menu.html'
})

export class GameSideMenuComponent {
  public ReportPage:any = ReportPage;
  public UserBetListPage:any = UserBetListPage;
  public ResultPage:any = ResultPage;
  public BankDealPage:any = BankDealPage;
  public RulesPage:any = RulesPage;
  @Input() gameKey:any;
  @Input() panName:any;
  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,) {
  }
  ngOnChanges(){
  }
  goPage(pageName){
  	this.navCtrl.push(pageName,{"gameKey":this.gameKey,"panName":this.panName})
  }
  presentPopover() {
  }
}
