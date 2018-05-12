import { Component, Input, EventEmitter, Output } from '@angular/core';
import gameDatas from '../../assets/data/gameData.js';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DealPriceListProvider } from '../../providers/deal-price-list/deal-price-list';
import { GamesProvider } from '../../providers/games/games';
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
    @Input() units: any;
    @Output() changeSelectedList: EventEmitter<any> = new EventEmitter();
    @Input() gameKey: any;

    public unitsDatas: any = { tmpl: '', units: [] };
    public gameDataList: any;
    public loadingMark: any = true;
    public selectedList: any = [];
    constructor(
        public HttpService: HttpServiceProvider,
        public alertCtrl: AlertController,
        public dealPriceList: DealPriceListProvider,
        public games: GamesProvider) {
    }
    ngOnChanges() {
        if (this.units) {
            this.units.units.map(item => {
                if ('nums' in item) {
                    item.nums = Object['values'](item.nums);
                }
            })
            this.unitsDatas = this.units;
        }
    }
    getGamePrice_list() {
        // let { gamekey, gameType, gamePan } = this;
        // const tempGameType = gameType;
        // let token = window.localStorage.getItem('token');
        // //判断处理组合页面
        // if (gameType === "cqssc1to5") { //时时彩1-5
        //     gameType = "ball_1";
        // } else if (gameType === "bjpk101to10") { //北京PK10 1-10
        //     gameType = "ball_1";
        // } else { }
        // let url = `/event/price_list?gamekey=${gamekey}&pan=${gamePan}&type=${gameType}&tk=${token}`;
        // this.HttpService.get(url).subscribe((res: Response) => {
        //     // console.log(res['priceList'])
        //     this.gameDataList.priceList = this.dealPriceList.datatype(tempGameType, res['priceList']);
        //     console.log(this.gameDataList)
        // });

    }
    selectItem(itemAry, index1, index2) {
        // this.unitsDatas.units[index1].nums[index2].checked = !this.unitsDatas.units[index1].nums[index2].checked;
        let tempArray = new Array();
        itemAry['checked'] = !itemAry['checked']; //选中/取消
        // //筛选选中的数据返回给调用组件的页面
        for (let i = 0; i < this.unitsDatas.units.length; i++) {
            for (let j in this.unitsDatas.units[i].nums) {
                if (this.unitsDatas.units[i].nums[j]['checked']) {
                    tempArray.push(this.unitsDatas.units[i].nums[j])
                }
            }
        }
        this.changeSelectedList.emit(tempArray);
    }

    cencelSelected() {  //取消所有选中项

        let confirm = this.alertCtrl.create({
            title: '确定取消所有选中项?',
            buttons: [
                { text: '取消' },
                {
                    text: '确定',
                    handler: () => {
                        for (let i = 0; i < this.unitsDatas.units.length; i++) {
                            for (let j in this.unitsDatas.units[i].nums) {
                                this.unitsDatas.units[i].nums[j]['checked'] = false;
                            }
                        }
                        this.changeSelectedList.emit([]);
                    }
                }
            ]
        });
        confirm.present();
    }
}
