import { Component,Input,EventEmitter, Output} from '@angular/core';
import gameDatas from '../../assets/data/gameData.js';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service'; 
import { DealPriceListProvider } from '../../providers/deal-price-list/deal-price-list';
/**
 * Generated class for the GameSelect_01Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'game-select-01',
  templateUrl: 'game-select-01.html'
})
export class GameSelect_01Component {
	@Input() gamekey:any;
	@Input() gameType:any;
  @Input() gamePan:any;
  @Output() changeSelectedList: EventEmitter<any> = new EventEmitter();
  public gameDataList:any;
  public loadingMark:any = true;
  public selectedList:any = [];
  constructor(public HttpService:HttpServiceProvider,public alertCtrl: AlertController,public dealPriceList : DealPriceListProvider) {
  }
  ngOnChanges(){
    //根据传递进来的 gamekey、gameType 初始化当前显示结构
    for(let i=0;i<gameDatas[this.gamekey].type.length;i++){
        if(gameDatas[this.gamekey].type[i].gameType == this.gameType){
          this.gameDataList = gameDatas[this.gamekey].type[i];
        }
    }
    this.changeSelectedList.emit([]);
    this.getGamePrice_list();
  }
  getGamePrice_list(){
      let {gamekey,gameType,gamePan} = this;
      const tempGameType = gameType;
      let token = window.localStorage.getItem('token');
      //判断处理组合页面
      if(gameType==="cqssc1to5"){ //时时彩1-5
          gameType = "ball_1";
      }else if(gameType==="bjpk101to10"){ //北京PK10 1-10
          gameType = "ball_1";
      }else{}
      let url = `/event/price_list?gamekey=${gamekey}&pan=${gamePan}&type=${gameType}&tk=${token}`;
      this.HttpService.get(url).subscribe((res: Response) => {
          // console.log(res['priceList'])
          this.gameDataList.priceList = this.dealPriceList.datatype(tempGameType,res['priceList']);
          console.log(this.gameDataList)
      });
      
  }
  selectItem(itemAry,index1,index2){
    let tempArray = new Array();
      itemAry['checked'] = !itemAry['checked']; //选中/取消

      //筛选选中的数据返回给调用组件的页面
      for(let i=0;i<this.gameDataList.priceList.length;i++){
          for(let j=0;j<this.gameDataList.priceList[i].line.length;j++){
              if(this.gameDataList.priceList[i].line[j]['checked']){
                  tempArray.push(this.gameDataList.priceList[i].line[j])
              }
          }
      }
      this.changeSelectedList.emit(tempArray);
  }
  selectItem2(itemAry,index1,index2,index3){
    console.log(itemAry,index1,index2,index3)
    // let tempArray = new Array();
      itemAry['checked'] = !itemAry['checked']; //选中/取消

    //   //筛选选中的数据返回给调用组件的页面
    //   for(let i=0;i<this.gameDataList.priceList.length;i++){
    //       for(let j=0;j<this.gameDataList.priceList[i].line.length;j++){
    //           for(let k=0;k<this.gameDataList.priceList[i].line[j].length;k++){
    //               if(this.gameDataList.priceList[i].line[j][k]['checked']){
    //                   tempArray.push(this.gameDataList.priceList[i].line[j])
    //               }
    //           }
    //       }
    //   }
    //   console.log(this.gameDataList)
    //   this.changeSelectedList.emit(tempArray);
  }
  cencelSelected(){  //取消所有选中项
      for(let i=0;i<this.gameDataList.priceList.length;i++){
          for(let j=0;j<this.gameDataList.priceList[i].line.length;j++){
              this.gameDataList.priceList[i].line[j]['checked'] = false;
          }
      }
      this.changeSelectedList.emit([]);
  }
}
