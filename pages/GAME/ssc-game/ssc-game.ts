import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { ReportPage } from '../../../pages/USER/report/report'; //投注报表

import gameDatas from '../../../assets/data/gameData.js';
/**
 * Generated class for the SscGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ssc-game',
  templateUrl: 'ssc-game.html',
})
export class SscGamePage {
  public ReportPage:any = ReportPage;
  public cqsscDatas:any = gameDatas.cqssc; //游戏基本数据结构
  public activeGameType:any = this.cqsscDatas.type[0].gameType;  //当前选择的游戏类型 默认第一个
  public activeGamePan:any = 'A';  //当前选择的游戏盘区 默认A
  public selectedList:any=[];
  public selectedListLength:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController){
      
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SscGamePage');
  }
  changeSelectedList(e){
      this.selectedList = e;
  }
  goPage(pageName){
    this.navCtrl.push(pageName)
  }
	goHome(){
  	this.navCtrl.pop()
  }
  gameKeyClickEvent(gameType){
      this.activeGameType = gameType;
  }
  checkOrder(){
      console.log(this.selectedList,this.selectedListLength)
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择要切换的盘',
      buttons: [
        {
          text: 'A盘',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'B盘',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'C盘',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}

