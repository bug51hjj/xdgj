import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//自定义组件
import { ComponentsModule } from '../components/components.module';

//页面
import { MyApp } from './app.component'; //页面容器
import { HomePage } from '../pages/home/home'; //主页
import { LoginPage } from '../pages/login/login'; //登录页

import { UserIndexPage } from '../pages/USER/user-index/user-index'; //用户中心
import { AccountPage } from '../pages/USER/account/account'; //用户中心-我的账户
import { PasswordPage } from '../pages/USER/password/password'; //用户中心-修改密码
import { MsgListPage } from '../pages/USER/msg-list/msg-list'; //用户中心-信息列表
import { MessagePage } from '../pages/USER/message/message'; //用户中心-信息内容
import { BankDealPage } from '../pages/USER/bank-deal/bank-deal'; //用户中心-银行交易
import { BankAddPage } from '../pages/USER/bank-add/bank-add'; //用户中心-添加银行卡
import { BankInfoPage } from '../pages/USER/bank-info/bank-info'; //用户中心-银行资料
import { ReportPage } from '../pages/USER/report/report'; //用户中心-投注报表
import { CustomeSePage } from '../pages/USER/custome-se/custome-se'; //用户中心-客服
import { UserBetListPage } from '../pages/USER/user-bet-list/user-bet-list'; //用户中心-即时投注

import { GameCenterPage } from '../pages/GAME/game-center/game-center'; //游戏
import { ResultPage } from '../pages/GAME/result/result'; //游戏-开奖结果
import { RulesPage } from '../pages/GAME/rules/rules';//游戏-游戏规则   

//自定义服务
import { HttpServiceProvider } from '../providers/http-service/http-service'; 
import { DealPriceListProvider } from '../providers/deal-price-list/deal-price-list';
import { UuidProvider } from '../providers/uuid/uuid';
import { GetDateProvider } from '../providers/get-date/get-date';
import { GamesProvider } from '../providers/games/games';

// import 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UserIndexPage,
    AccountPage,
    PasswordPage,
    MsgListPage,
    MessagePage,
    BankDealPage,
    BankAddPage,
    BankInfoPage,
    ReportPage,
    CustomeSePage,
    UserBetListPage,
    ResultPage,
    RulesPage,
    GameCenterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
       mode:'ios',
        tabsHideOnSubPages:true,
        platforms:{
          ios:{
            menuType:'overlay'
          }
        }
    }),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UserIndexPage,
    AccountPage,
    PasswordPage,
    MsgListPage,
    MessagePage,
    BankDealPage,
    BankAddPage,
    BankInfoPage,
    ReportPage,
    CustomeSePage,
    UserBetListPage,
    ResultPage,
    RulesPage,
    GameCenterPage
  ],
  providers: [
    StatusBar,
    HttpModule,
    SplashScreen,
    ComponentsModule,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    DealPriceListProvider,
    UuidProvider,
    GetDateProvider,
    GamesProvider,
  ]
})
export class AppModule {}
