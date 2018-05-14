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
    public hklhcDdlActive:any;
    constructor(
        public HttpService: HttpServiceProvider,
        public alertCtrl: AlertController,
        public dealPriceList: DealPriceListProvider,
        public games: GamesProvider) {
    }
    ngOnChanges() {
        if (this.units) {
            this.cencelSelected(false)
            this.units.units.map(item => {
                if ('nums' in item) {
                    item.nums = Object['values'](item.nums);
                }
            })
            if (this.gameKey == 'hklhc') {
                if(this.units.tmpl=='ddl'){  //六合彩 ddl 类型
                    this.hklhcDdlActive = this.units.units[0].name;
                }
                let $redNum = ("1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46").split(',');
                let $blueNum = ("3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48").split(',');
                let $greenNum = ("5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49").split(',');
                let $needColorMark = ['特码','正码','正码特','连码','全不中'];
                let $needColorNumber = ['半波','特码生肖','连肖中','一肖/尾数','合肖','连肖中','连尾中','连尾不中']
                if($needColorMark['includes'](this.units.name)){  //['特码','正码','正码特','连码','全不中'] 添加颜色标志 
                    this.units.units.map(_units => {
                        _units.nums.map(_nums => {
                            if ($redNum['includes'](_nums.name)) {
                                _nums['color'] = 'lhc-bgRed'
                            } else if ($blueNum['includes'](_nums.name)) {
                                _nums['color'] = 'lhc-bgBlue'
                            } else if ($greenNum['includes'](_nums.name)) {
                                _nums['color'] = 'lhc-bgGreen'
                            }else{
                                _nums['color'] = 'boldFont'
                            }
                        })
                    })
                }
                if($needColorNumber['includes'](this.units.name)){  //六合彩 获取类型数字
                    this.units.units.map(_units => {
                        _units.nums.map(_nums => {
                            _nums['numbers'] = [];
                            // if(_nums.name.indexOf('红')!=-1){_nums['classColor']="hklhc_bgColor lhc-bgRed"}
                            // if(_nums.name.indexOf('绿')!=-1){_nums['classColor']="hklhc_bgColor lhc-bgGreen"}
                            // if(_nums.name.indexOf('蓝')!=-1){_nums['classColor']="hklhc_bgColor lhc-bgBlue"}
                            let tempNums = this.games.getLhcNums(_nums.name);
                            if(tempNums){
                                tempNums.map(_num=>{
                                    if($redNum['includes'](_num)){_nums['numbers'].push({text:_num,classColor:"hklhc_bgColor lhc-bgRed"})}
                                    if($blueNum['includes'](_num)){_nums['numbers'].push({text:_num,classColor:"hklhc_bgColor lhc-bgBlue"})}
                                    if($greenNum['includes'](_num)){_nums['numbers'].push({text:_num,classColor:"hklhc_bgColor lhc-bgGreen"})}
                                })
                            }
                            // this.units['getLhcNums']=this.games.getLhcNums(_nums.name)
                        })
                    })
                }
                


            }
            this.unitsDatas = this.units;
            console.log(this.unitsDatas)
        }
    }
    numbersColor(nums:any[]){

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
    selectItem(itemAry) {
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
    selectItem_enum_lhc_gg(itemAry,_group,index1){
        //选中、取消
        this.unitsDatas.units[index1].nums.map(item=>{
            if(item.seGroup==_group){
                item['checked'] = false;
            }
        })
        let tempArray = new Array();
        itemAry['checked'] = true;
        for (let i = 0; i < this.unitsDatas.units.length; i++) {
            for (let j in this.unitsDatas.units[i].nums) {
                if (this.unitsDatas.units[i].nums[j]['checked']) {
                    tempArray.push(this.unitsDatas.units[i].nums[j])
                }
            }
        }
        this.changeSelectedList.emit(tempArray);
    }
    cencelSelected(isConfirm) {  //取消所有选中项
        if (isConfirm) {
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
        } else {
            for (let i = 0; i < this.unitsDatas.units.length; i++) {
                for (let j in this.unitsDatas.units[i].nums) {
                    this.unitsDatas.units[i].nums[j]['checked'] = false;
                }
            }
            this.changeSelectedList.emit([]);
        }

    }
}
