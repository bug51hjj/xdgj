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
        console.log(this.units)
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
                let $needColorNumber = ['半波','特码生肖','连肖中','一肖/尾数','合肖','连肖中','连肖不中','连尾中','连尾不中']
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
        this.changeSelectedList.emit({list:tempArray,type:'public',count:tempArray.length});
    }
    selectItem_enum_lhc_gg(itemAry,_group,index1){ //过关 选中取消 多选一
        let tempChecked = itemAry['checked'];
        //选中、取消
        this.unitsDatas.units[index1].nums.map(item=>{
            if(item.seGroup==_group){
                item['checked'] = false;
            }
        })
        let tempArray = new Array();
        itemAry['checked'] = !tempChecked;
        for (let i = 0; i < this.unitsDatas.units.length; i++) {
            for (let j in this.unitsDatas.units[i].nums) {
                if (this.unitsDatas.units[i].nums[j]['checked']) {
                    tempArray.push(this.unitsDatas.units[i].nums[j])
                }
            }
        }
        this.changeSelectedList.emit({list:tempArray,type:'hklhcgg',count:1});
    }
    selectItem_limit(itemAry,target_index){  //合肖选中取消 限制数量
        let limitLength = Number(itemAry.func.substring(6,itemAry.func.length));
        let trueNum = 0;
        itemAry.nums.map(item=>{if(item['checked']){trueNum++}});
        if(trueNum>=limitLength){
            if(!itemAry.nums[target_index]['checked']){
                let alert = this.alertCtrl.create({
                    subTitle: `选择数量应该为${limitLength}个`,
                    buttons: ['OK']
                  });
                  alert.present();
                return false;
            }
        }
        itemAry.nums[target_index]['checked'] = !itemAry.nums[target_index]['checked'];
        // //筛选选中的数据返回给调用组件的页面
        let tempArray = new Array();
        itemAry.nums.map(item=>{
            if(item['checked']){
                tempArray.push(item)
            }
        });
        this.changeSelectedList.emit({list:tempArray,type:'hklhchx',limit:limitLength,count:1});

    }
    selectItem_comb(itemAry,parentAry){ //六合彩选中取消 排列组合
        let tempArray = new Array();
        let comb = Number(parentAry.func.substring(5,6));
        itemAry['checked'] = !itemAry['checked']; //选中/取消
        parentAry.nums.map(item=>{
            if(item['checked']){
                tempArray.push(item)
            }
        })
        let combResult = this.games.getCombCount(tempArray.length,comb);      
        // //筛选选中的数据返回给调用组件的页面
        // for (let i = 0; i < this.unitsDatas.units.length; i++) {
        //     for (let j in this.unitsDatas.units[i].nums) {
        //         if (this.unitsDatas.units[i].nums[j]['checked']) {
        //             tempArray.push(this.unitsDatas.units[i].nums[j])
        //         }
        //     }
        // }
        this.changeSelectedList.emit({list:tempArray,type:'hklhccomb',comb:comb,count:combResult<1?0:combResult});
    }
    selectItem_pk10gg(itemAry,type,seGroup){  //PK10 过关
        let lengthAry = type===1?[0,1,2,3,4]:[5,6,7,8,9];
        let tempCheckMark = itemAry['checked'];
        lengthAry.map(_i=>{
            this.units.units[_i].nums.map(_j=>{
                if(_j.seGroup===seGroup){_j['checked']=false}
            })
        })
        itemAry['checked'] = !tempCheckMark;

        let tempArray = [];
        this.units.units.map(_nums=>{
            _nums.nums.map(item=>{
                if(item['checked']){tempArray.push(item)}
            })
        })
        this.changeSelectedList.emit({list:tempArray,type:'pk10hhgg',count:tempArray.length>1?1:0});
    }
    selectItem_cqsscgg(itemAry,seGroup){  //PK10 过关
        // let lengthAry = type===1?[0,1,2,3,4]:[5,6,7,8,9];
        let tempCheckMark = itemAry['checked'];
        this.units.units.map(_units=>{
            _units.nums.map(_nums=>{
                if(_nums.seGroup===seGroup){_nums['checked']=false}
            })
        })

        itemAry['checked'] = !tempCheckMark;
        let tempArray = [];
        this.units.units.map(_units=>{
            _units.nums.map(_nums=>{
                if(_nums['checked']){tempArray.push(_nums)}
            })
        })

        this.changeSelectedList.emit({list:tempArray,type:'pk10hhgg',count:tempArray.length>1?1:0});
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
                            this.changeSelectedList.emit({list:[],type:'public',count:0});
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
            this.changeSelectedList.emit({list:[],type:'public',count:0});
        }

    }
}
