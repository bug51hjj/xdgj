import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the GamesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GamesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GamesProvider Provider');
  }

  getLotteryCategory(gameKey) {
    switch (gameKey) {
      case 'cqssc':
        return 'ssc';
      case 'bjpk10':
      case 'xyft':
        return 'pk10';
      case 'jnd28':
        return 'pc28';
      case 'hklhc':
        return 'lhc';
      case 'cqft':
        return 'ssctf';
      case 'bjft':
        return 'pk10ft';
    }
  }

  /**
   * 处理彩种->盘口赔率数据
   * @param prizes 通过接口获取的赔率数据：priceList:[]
   * @returns {{}}
   */
  getLotteryPrizes(prizes) {
    var datas = {};
    for (var i = 0; i < prizes.priceList.length; i++) {
      var priceItem = prizes.priceList[i];
      datas[priceItem['type']] = {
        'type': priceItem['type'],
        'type_name': priceItem['type_name'],
        'line': {},
      };

      for (var j = 0; j < priceItem.line.length; j++) {
        var priceLine = priceItem.line[j];
        datas[priceItem['type']][priceLine['play_method']] = priceLine;
      }
    }
    return datas;
  }

  getLotteryPlays() {

    var plays = {};
    plays['ssc'] = [
      {
        'name': '1~5', 'tmpl': 'column', 'units': [
          {'name': '第一球', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_1', 'a', 1)},
          {'name': '第二球', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_2', 'b', 1)},
          {'name': '第三球', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_3', 'c', 1)},
          {'name': '第四球', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_4', 'd', 1)},
          {'name': '第五球', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_5', 'e', 1)},
        ],
      }, {
        'name': '两面总和', 'tmpl': 'list', 'units': [
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("总和大,总和小,总和单,总和双", 'ball_6', 'z', 1)},
          {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr("龙,虎,和", 'ball_6', 'z', 11)},
        ],
      }, {
        'name': '第一球', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_1', 'a', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_1', 'a', 11)},
        ],
      }, {
        'name': '第二球', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_2', 'b', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_2', 'b', 11)},
        ],
      }, {
        'name': '第三球', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_3', 'c', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_3', 'c', 11)},
        ],
      }, {
        'name': '第四球', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_4', 'd', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_4', 'd', 11)},
        ],
      }, {
        'name': '第五球', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_5', 'e', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_5', 'e', 11)},
        ],
      }, {
        'name': '前三', 'tmpl': 'list', 'units': [
          {'name': '前三', 'func': 'idx', 'nums': this.getPlayUnitByStr('豹子,顺子,对子,半顺,杂六', 'ball_7', 'f', 1)},
        ],
      }, {
        'name': '中三', 'tmpl': 'list', 'units': [
          {'name': '中三', 'func': 'idx', 'nums': this.getPlayUnitByStr('豹子,顺子,对子,半顺,杂六', 'ball_8', 'g', 1)},
        ],
      }, {
        'name': '后三', 'tmpl': 'list', 'units': [
          {'name': '后三', 'func': 'idx', 'nums': this.getPlayUnitByStr('豹子,顺子,对子,半顺,杂六', 'ball_9', 'h', 1)},
        ],
      }, {
        'name': '斗牛', 'tmpl': 'list', 'units': [
          {
            'name': '斗牛',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('没牛,牛1,牛2,牛3,牛4,牛5,牛6,牛7,牛8,牛9,牛牛', 'ball_10', 'i', 1)
          },
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("牛大,牛小,牛单,牛双", 'ball_10', 'i', 12)},
        ],
      }, {
        'name': '梭哈', 'tmpl': 'list', 'units': [
          {'name': '梭哈', 'func': 'idx', 'nums': this.getPlayUnitByStr('五条,四条,葫芦,顺子,三条,两对,一对,散号', 'ball_11', 'j', 1)},
        ],
      },
    ];

    plays['pk10'] = [
      {
        'name': '1~10', 'tmpl': 'list', 'units': [
          {'name': '冠军', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_1', 'a', 1)},
          {'name': '亚军', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_2', 'b', 1)},
          {'name': '季军', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_3', 'c', 1)},
          {'name': '第4名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_4', 'd', 1)},
          {'name': '第5名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_5', 'e', 1)},
          {'name': '第6名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_6', 'f', 1)},
          {'name': '第7名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_7', 'g', 1)},
          {'name': '第8名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_8', 'h', 1)},
          {'name': '第9名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_9', 'i', 1)},
          {'name': '第10名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_10', 'j', 1)},
        ],
      }, {
        'name': '两面', 'tmpl': 'list', 'units': [
          {
            'name': '冠军', 'func': 'idx', 'nums': {
              '大': {'type': 'ball_1', 'play_method': 'a11'},
              '小': {'type': 'ball_1', 'play_method': 'a12'},
              '单': {'type': 'ball_1', 'play_method': 'a13'},
              '双': {'type': 'ball_1', 'play_method': 'a14'},
              '龙': {'type': 'ball_11', 'play_method': 'l1'},
              '虎': {'type': 'ball_11', 'play_method': 'l2'},
            }
          },
          {
            'name': '亚军', 'func': 'idx', 'nums': {
              '大': {'type': 'ball_2', 'play_method': 'b11'},
              '小': {'type': 'ball_2', 'play_method': 'b12'},
              '单': {'type': 'ball_2', 'play_method': 'b13'},
              '双': {'type': 'ball_2', 'play_method': 'b14'},
              '龙': {'type': 'ball_11', 'play_method': 'l3'},
              '虎': {'type': 'ball_11', 'play_method': 'l4'},
            }
          },
          {
            'name': '季军', 'func': 'idx', 'nums': {
              '大': {'type': 'ball_3', 'play_method': 'c11'},
              '小': {'type': 'ball_3', 'play_method': 'c12'},
              '单': {'type': 'ball_3', 'play_method': 'c13'},
              '双': {'type': 'ball_3', 'play_method': 'c14'},
              '龙': {'type': 'ball_11', 'play_method': 'l5'},
              '虎': {'type': 'ball_11', 'play_method': 'l6'},
            }
          },
          {
            'name': '第4名', 'func': 'idx', 'nums': {
              '大': {'type': 'ball_4', 'play_method': 'd11'},
              '小': {'type': 'ball_4', 'play_method': 'd12'},
              '单': {'type': 'ball_4', 'play_method': 'd13'},
              '双': {'type': 'ball_4', 'play_method': 'd14'},
              '龙': {'type': 'ball_11', 'play_method': 'l7'},
              '虎': {'type': 'ball_11', 'play_method': 'l8'},
            }
          },
          {
            'name': '第5名', 'func': 'idx', 'nums': {
              '大': {'type': 'ball_5', 'play_method': 'e11'},
              '小': {'type': 'ball_5', 'play_method': 'e12'},
              '单': {'type': 'ball_5', 'play_method': 'e13'},
              '双': {'type': 'ball_5', 'play_method': 'e14'},
              '龙': {'type': 'ball_11', 'play_method': 'l9'},
              '虎': {'type': 'ball_11', 'play_method': 'l10'},
            }
          },
          {'name': '第6名', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_6', 'f', 11)},
          {'name': '第7名', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_7', 'g', 11)},
          {'name': '第8名', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_8', 'h', 11)},
          {'name': '第9名', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_9', 'i', 11)},
          {'name': '第10名', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_10', 'j', 11)},
        ],
      }, {
        'name': '冠亚和', 'tmpl': 'list', 'units': [
          {
            'name': '定位',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19', 'ball_11', 'z', 5)
          },
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_11', 'z', 1)},
        ],
      }, {
        'name': '冠军', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_1', 'a', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_1', 'a', 11)},
          {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_11', 'l', 1)},
        ],
      }, {
        'name': '亚军', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_2', 'b', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_2', 'b', 11)},
          {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_11', 'l', 3)},
        ],
      }, {
        'name': '季军', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_3', 'c', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_3', 'c', 11)},
          {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_11', 'l', 5)},
        ],
      }, {
        'name': '第4名', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_4', 'd', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_4', 'd', 11)},
          {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_11', 'l', 7)},
        ],
      }, {
        'name': '第5名', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_5', 'e', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_5', 'e', 11)},
          {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_11', 'l', 9)},
        ],
      }, {
        'name': '第6名', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_6', 'f', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_6', 'f', 11)},
        ],
      }, {
        'name': '第7名', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_7', 'g', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_7', 'g', 11)},
        ],
      }, {
        'name': '第8名', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_8', 'h', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_8', 'h', 11)},
        ],
      }, {
        'name': '第9名', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_9', 'i', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_9', 'i', 11)},
        ],
      }, {
        'name': '第10名', 'tmpl': 'list', 'units': [
          {'name': '定位', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_10', 'j', 1)},
          {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_10', 'j', 11)},
        ],
      },
    ];

    plays['lhc'] = [
      {
        'name': '特码', 'tmpl': 'list', 'units': [
          {
            'name': '特码A',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'temaa', 'temaa_', 1)
          },
          {
            'name': '特码B',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'temab', 'temab_', 1)
          },
        ]
      },
      {
        'name': '特码两面', 'tmpl': 'list', 'units': [
          {
            'name': '首位', 'func': 'idx', 'nums': {
              '1-10': {'type': 'tema_dxds', 'play_method': 'tema_dxds_1to10'},
              '11-20': {'type': 'tema_dxds', 'play_method': 'tema_dxds_11to20'},
              '21-30': {'type': 'tema_dxds', 'play_method': 'tema_dxds_21to30'},
              '31-40': {'type': 'tema_dxds', 'play_method': 'tema_dxds_31to40'},
              '41-49': {'type': 'tema_dxds', 'play_method': 'tema_dxds_41to49'},
            }
          },
          {
            'name': '大小单双', 'func': 'idx', 'nums': {
              '大': {'type': 'tema_dxds', 'play_method': 'tema_dxds_da'},
              '小': {'type': 'tema_dxds', 'play_method': 'tema_dxds_xiao'},
              '单': {'type': 'tema_dxds', 'play_method': 'tema_dxds_dan'},
              '双': {'type': 'tema_dxds', 'play_method': 'tema_dxds_shuang'},
            }
          },
          {
            'name': '合数', 'func': 'idx', 'nums': {
              '合大': {'type': 'tema_dxds', 'play_method': 'tema_dxds_heda'},
              '合小': {'type': 'tema_dxds', 'play_method': 'tema_dxds_hexiao'},
              '合单': {'type': 'tema_dxds', 'play_method': 'tema_dxds_hedan'},
              '合双': {'type': 'tema_dxds', 'play_method': 'tema_dxds_heshuang'},
            }
          },
          {
            'name': '组合', 'func': 'idx', 'nums': {
              '大单': {'type': 'tema_dxds', 'play_method': 'tema_dxds_dadan'},
              '大双': {'type': 'tema_dxds', 'play_method': 'tema_dxds_dashuang'},
              '小单': {'type': 'tema_dxds', 'play_method': 'tema_dxds_xiaodan'},
              '小双': {'type': 'tema_dxds', 'play_method': 'tema_dxds_xiaoshuang'},
            }
          },
          {
            'name': '尾数', 'func': 'idx', 'nums': {
              '尾大': {'type': 'tema_dxds', 'play_method': 'tema_dxds_weida'},
              '尾小': {'type': 'tema_dxds', 'play_method': 'tema_dxds_weixiao'},
            }
          },
          {
            'name': '家禽野兽', 'func': 'idx', 'nums': {
              '家禽': {'type': 'tema_dxds', 'play_method': 'tema_dxds_jiaqin'},
              '野兽': {'type': 'tema_dxds', 'play_method': 'tema_dxds_yeshou'},
            }
          },
          {
            'name': '色波', 'func': 'idx', 'nums': {
              '红波': {'type': 'tema_dxds', 'play_method': 'tema_dxds_red'},
              '绿波': {'type': 'tema_dxds', 'play_method': 'tema_dxds_green'},
              '蓝波': {'type': 'tema_dxds', 'play_method': 'tema_dxds_blue'},
            }
          },
        ]
      },
      {
        'name': '正码', 'tmpl': 'list', 'units': [
          {
            'name': '正码', 'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'zhengma', 'zhengma_', 1)
          },
          {
            'name': '大小单双', 'func': 'idx',
            'nums': {
              '总大': {'type': 'zhengma_dxds', 'play_method': 'zhengma_dxds_zongda'},
              '总小': {'type': 'zhengma_dxds', 'play_method': 'zhengma_dxds_zongxiao'},
              '总单': {'type': 'zhengma_dxds', 'play_method': 'zhengma_dxds_zongdan'},
              '总双': {'type': 'zhengma_dxds', 'play_method': 'zhengma_dxds_zongshuang'},
            }
          },
          {
            'name': '尾数', 'func': 'idx', 'nums': {
              '总尾大': {'type': 'zhengma_dxds', 'play_method': 'zhengma_dxds_zongweida'},
              '总尾小': {'type': 'zhengma_dxds', 'play_method': 'zhengma_dxds_zongweixiao'},
            }
          },
          {
            'name': '龙虎', 'func': 'idx', 'nums': {
              '龙': {'type': 'zhengma_dxds', 'play_method': 'zhengma_dxds_long'},
              '虎': {'type': 'zhengma_dxds', 'play_method': 'zhengma_dxds_hu'},
            }
          },
        ]
      },
      {
        'name': '正码特', 'tmpl': 'list', 'units': [
          {
            'name': '正1特',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'zhengmate1', 'zhengmate1_', 1)
          },
          {
            'name': '正2特',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'zhengmate2', 'zhengmate2_', 1)
          },
          {
            'name': '正3特',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'zhengmate3', 'zhengmate3_', 1)
          },
          {
            'name': '正4特',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'zhengmate4', 'zhengmate4_', 1)
          },
          {
            'name': '正5特',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'zhengmate5', 'zhengmate5_', 1)
          },
          {
            'name': '正6特',
            'func': 'idx',
            'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'zhengmate6', 'zhengmate6_', 1)
          },
        ]
      },
      {
        'name': '正码1~6', 'tmpl': 'list', 'units': [
          {
            'name': '正码1', 'func': 'idx', 'nums': {
              '大': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_da'},
              '小': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_xiao'},
              '单': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_dan'},
              '双': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_shuang'},
              '合大': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_heda'},
              '合小': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_hexiao'},
              '合单': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_hedan'},
              '合双': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_heshuang'},
              '尾大': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_weida'},
              '尾小': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_weixiao'},
              '红波': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_red'},
              '绿波': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_green'},
              '蓝波': {'type': 'zhengma_1to6', 'play_method': 'zhengma1_blue'},
            }
          },
          {
            'name': '正码2', 'func': 'idx', 'nums': {
              '大': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_da'},
              '小': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_xiao'},
              '单': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_dan'},
              '双': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_shuang'},
              '合大': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_heda'},
              '合小': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_hexiao'},
              '合单': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_hedan'},
              '合双': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_heshuang'},
              '尾大': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_weida'},
              '尾小': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_weixiao'},
              '红波': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_red'},
              '绿波': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_green'},
              '蓝波': {'type': 'zhengma_1to6', 'play_method': 'zhengma2_blue'},
            }
          },
          {
            'name': '正码3', 'func': 'idx', 'nums': {
              '大': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_da'},
              '小': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_xiao'},
              '单': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_dan'},
              '双': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_shuang'},
              '合大': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_heda'},
              '合小': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_hexiao'},
              '合单': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_hedan'},
              '合双': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_heshuang'},
              '尾大': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_weida'},
              '尾小': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_weixiao'},
              '红波': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_red'},
              '绿波': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_green'},
              '蓝波': {'type': 'zhengma_1to6', 'play_method': 'zhengma3_blue'},
            }
          },
          {
            'name': '正码4', 'func': 'idx', 'nums': {
              '大': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_da'},
              '小': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_xiao'},
              '单': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_dan'},
              '双': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_shuang'},
              '合大': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_heda'},
              '合小': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_hexiao'},
              '合单': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_hedan'},
              '合双': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_heshuang'},
              '尾大': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_weida'},
              '尾小': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_weixiao'},
              '红波': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_red'},
              '绿波': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_green'},
              '蓝波': {'type': 'zhengma_1to6', 'play_method': 'zhengma4_blue'},
            }
          },
          {
            'name': '正码5', 'func': 'idx', 'nums': {
              '大': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_da'},
              '小': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_xiao'},
              '单': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_dan'},
              '双': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_shuang'},
              '合大': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_heda'},
              '合小': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_hexiao'},
              '合单': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_hedan'},
              '合双': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_heshuang'},
              '尾大': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_weida'},
              '尾小': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_weixiao'},
              '红波': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_red'},
              '绿波': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_green'},
              '蓝波': {'type': 'zhengma_1to6', 'play_method': 'zhengma5_blue'},
            }
          },
          {
            'name': '正码6', 'func': 'idx', 'nums': {
              '大': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_da'},
              '小': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_xiao'},
              '单': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_dan'},
              '双': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_shuang'},
              '合大': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_heda'},
              '合小': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_hexiao'},
              '合单': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_hedan'},
              '合双': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_heshuang'},
              '尾大': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_weida'},
              '尾小': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_weixiao'},
              '红波': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_red'},
              '绿波': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_green'},
              '蓝波': {'type': 'zhengma_1to6', 'play_method': 'zhengma6_blue'},
            }
          },
        ]
      },
      {
        'name': '过关', 'tmpl': 'list', 'units': [
          {
            'name': '正码1', 'func': 'idx', 'nums': {
              '大': {'type': 'guoguan', 'play_method': 'guoguan1_da'},
              '小': {'type': 'guoguan', 'play_method': 'guoguan1_xiao'},
              '单': {'type': 'guoguan', 'play_method': 'guoguan1_dan'},
              '双': {'type': 'guoguan', 'play_method': 'guoguan1_shuang'},
              '红波': {'type': 'guoguan', 'play_method': 'guoguan1_red'},
              '绿波': {'type': 'guoguan', 'play_method': 'guoguan1_green'},
              '蓝波': {'type': 'guoguan', 'play_method': 'guoguan1_blue'},
            }
          },
          {
            'name': '正码2', 'func': 'idx', 'nums': {
              '大': {'type': 'guoguan', 'play_method': 'guoguan2_da'},
              '小': {'type': 'guoguan', 'play_method': 'guoguan2_xiao'},
              '单': {'type': 'guoguan', 'play_method': 'guoguan2_dan'},
              '双': {'type': 'guoguan', 'play_method': 'guoguan2_shuang'},
              '红波': {'type': 'guoguan', 'play_method': 'guoguan2_red'},
              '绿波': {'type': 'guoguan', 'play_method': 'guoguan2_green'},
              '蓝波': {'type': 'guoguan', 'play_method': 'guoguan2_blue'},
            }
          },
          {
            'name': '正码3', 'func': 'idx', 'nums': {
              '大': {'type': 'guoguan', 'play_method': 'guoguan3_da'},
              '小': {'type': 'guoguan', 'play_method': 'guoguan3_xiao'},
              '单': {'type': 'guoguan', 'play_method': 'guoguan3_dan'},
              '双': {'type': 'guoguan', 'play_method': 'guoguan3_shuang'},
              '红波': {'type': 'guoguan', 'play_method': 'guoguan3_red'},
              '绿波': {'type': 'guoguan', 'play_method': 'guoguan3_green'},
              '蓝波': {'type': 'guoguan', 'play_method': 'guoguan3_blue'},
            }
          },
          {
            'name': '正码4', 'func': 'idx', 'nums': {
              '大': {'type': 'guoguan', 'play_method': 'guoguan4_da'},
              '小': {'type': 'guoguan', 'play_method': 'guoguan4_xiao'},
              '单': {'type': 'guoguan', 'play_method': 'guoguan4_dan'},
              '双': {'type': 'guoguan', 'play_method': 'guoguan4_shuang'},
              '红波': {'type': 'guoguan', 'play_method': 'guoguan4_red'},
              '绿波': {'type': 'guoguan', 'play_method': 'guoguan4_green'},
              '蓝波': {'type': 'guoguan', 'play_method': 'guoguan4_blue'},
            }
          },
          {
            'name': '正码5', 'func': 'idx', 'nums': {
              '大': {'type': 'guoguan', 'play_method': 'guoguan5_da'},
              '小': {'type': 'guoguan', 'play_method': 'guoguan5_xiao'},
              '单': {'type': 'guoguan', 'play_method': 'guoguan5_dan'},
              '双': {'type': 'guoguan', 'play_method': 'guoguan5_shuang'},
              '红波': {'type': 'guoguan', 'play_method': 'guoguan5_red'},
              '绿波': {'type': 'guoguan', 'play_method': 'guoguan5_green'},
              '蓝波': {'type': 'guoguan', 'play_method': 'guoguan5_blue'},
            }
          },
          {
            'name': '正码6', 'func': 'idx', 'nums': {
              '大': {'type': 'guoguan', 'play_method': 'guoguan6_da'},
              '小': {'type': 'guoguan', 'play_method': 'guoguan6_xiao'},
              '单': {'type': 'guoguan', 'play_method': 'guoguan6_dan'},
              '双': {'type': 'guoguan', 'play_method': 'guoguan6_shuang'},
              '红波': {'type': 'guoguan', 'play_method': 'guoguan6_red'},
              '绿波': {'type': 'guoguan', 'play_method': 'guoguan6_green'},
              '蓝波': {'type': 'guoguan', 'play_method': 'guoguan6_blue'},
            }
          },
        ]
      },
      {'name': '半波', 'tmpl': 'list', 'units': []},
      {'name': '一肖/尾数', 'tmpl': 'list', 'units': []},
      {'name': '特码生肖', 'tmpl': 'list', 'units': []},
      {'name': '合肖', 'tmpl': 'list', 'units': []},
      {'name': '连肖中', 'tmpl': 'list', 'units': []},
      {'name': '连肖不中', 'tmpl': 'list', 'units': []},
      {'name': '连尾中', 'tmpl': 'list', 'units': []},
      {'name': '连尾不中', 'tmpl': 'list', 'units': []},
    ];
  }

  getPlayUnitByStr(numsStr, unit, pre, i1) {
    var nums = numsStr.split(',');
    var playNums = {};
    for (var i in nums) {
      playNums[nums[i]] = {'type': unit, 'play_method': pre + (parseInt(i) + parseInt(i1))}
    }
    return playNums;
  }
}
