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

    /**
     * 根据彩种获得彩种类型
     * @param gameKey
     * @returns {string}
     */
    private getLotteryCategory(gameKey) {
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
    private getLotteryPrizes(prizes) {
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

    /**
     * 获得玩法数据
     * @returns {{}}
     */
    private getLotteryPlays() {
        var plays = {};
        plays['ssctf'] = [
            {
                'name': '番摊', 'tmpl': 'column', 'units': [
                {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_1', 'a', 1)},
                {'name': '正', 'func': 'idx', 'nums': this.getPlayUnitByStr("1正,2正,3正,4正", 'ball_2', 'b', 1)},
                {'name': '番', 'func': 'idx', 'nums': this.getPlayUnitByStr("1番,2番,3番,4番", 'ball_3', 'c', 1)},
                {'name': '角', 'func': 'idx', 'nums': this.getPlayUnitByStr("1-2角,2-3角,3-4角,4-1角", 'ball_4', 'd', 1)},
                {
                    'name': '念',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("1念2，1念3,1念4,2念1,2念3,2念4,3念1,3念2,3念4,4念1,4念2,4念3", 'ball_5', 'e', 1)
                },
                {'name': '三门', 'func': 'idx', 'nums': this.getPlayUnitByStr("123门,124门,234门,134门", 'ball_6', 'f', 1)},
                {
                    'name': '通',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("23一通,24一通,34一通,13二通,14二通,34二通,12三通,14三通,24三通,12四通,13四通,23四通", 'ball_7', 'g', 1)
                },
            ]
            },
        ];
        plays['pk10ft'] = [
            {
                'name': '前三', 'tmpl': 'column', 'units': [
                {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_1', 'a', 1)},
                {'name': '正', 'func': 'idx', 'nums': this.getPlayUnitByStr("1正,2正,3正,4正", 'ball_2', 'b', 1)},
                {'name': '番', 'func': 'idx', 'nums': this.getPlayUnitByStr("1番,2番,3番,4番", 'ball_3', 'c', 1)},
                {'name': '角', 'func': 'idx', 'nums': this.getPlayUnitByStr("1-2角,2-3角,3-4角,4-1角", 'ball_4', 'd', 1)},
                {
                    'name': '念',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("1念2，1念3,1念4,2念1,2念3,2念4,3念1,3念2,3念4,4念1,4念2,4念3", 'ball_5', 'e', 1)
                },
                {'name': '三门', 'func': 'idx', 'nums': this.getPlayUnitByStr("123门,124门,234门,134门", 'ball_6', 'f', 1)},
                {
                    'name': '通',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("23一通,24一通,34一通,13二通,14二通,34二通,12三通,14三通,24三通,12四通,13四通,23四通", 'ball_7', 'g', 1)
                },]
            },
            {
                'name': '中三', 'tmpl': 'column', 'units': [
                {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_8', 'i', 1)},
                {'name': '正', 'func': 'idx', 'nums': this.getPlayUnitByStr("1正,2正,3正,4正", 'ball_9', 'j', 1)},
                {'name': '番', 'func': 'idx', 'nums': this.getPlayUnitByStr("1番,2番,3番,4番", 'ball_10', 'k', 1)},
                {'name': '角', 'func': 'idx', 'nums': this.getPlayUnitByStr("1-2角,2-3角,3-4角,4-1角", 'ball_11', 'l', 1)},
                {
                    'name': '念',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("1念2，1念3,1念4,2念1,2念3,2念4,3念1,3念2,3念4,4念1,4念2,4念3", 'ball_12', 'm', 1)
                },
                {'name': '三门', 'func': 'idx', 'nums': this.getPlayUnitByStr("123门,124门,234门,134门", 'ball_13', 'n', 1)},
                {
                    'name': '通',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("23一通,24一通,34一通,13二通,14二通,34二通,12三通,14三通,24三通,12四通,13四通,23四通", 'ball_14', 'o', 1)
                },]
            },
            {
                'name': '后三', 'tmpl': 'column', 'units': [
                {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_15', 'p', 1)},
                {'name': '正', 'func': 'idx', 'nums': this.getPlayUnitByStr("1正,2正,3正,4正", 'ball_16', 'q', 1)},
                {'name': '番', 'func': 'idx', 'nums': this.getPlayUnitByStr("1番,2番,3番,4番", 'ball_17', 'r', 1)},
                {'name': '角', 'func': 'idx', 'nums': this.getPlayUnitByStr("1-2角,2-3角,3-4角,4-1角", 'ball_18', 's', 1)},
                {
                    'name': '念',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("1念2，1念3,1念4,2念1,2念3,2念4,3念1,3念2,3念4,4念1,4念2,4念3", 'ball_19', 't', 1)
                },
                {'name': '三门', 'func': 'idx', 'nums': this.getPlayUnitByStr("123门,124门,234门,134门", 'ball_20', 'u', 1)},
                {
                    'name': '通',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("23一通,24一通,34一通,13二通,14二通,34二通,12三通,14三通,24三通,12四通,13四通,23四通", 'ball_21', 'v', 1)
                },]
            },
            {
                'name': '综合过关', 'tmpl': 'column', 'units': [
                {
                    'name': '前三',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("1番,2番,3番,4番,1正,2正,3正,4正,1-2角,2-3角,3-4角,1-4角,1念2，1念3,1念4,2念1,2念3,2念4,3念1,3念2,3念4,4念1,4念2,4念3", 'guoguan', 'gg1_', 1)
                },
                {
                    'name': '中三',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("1番,2番,3番,4番,1正,2正,3正,4正,1-2角,2-3角,3-4角,1-4角,1念2，1念3,1念4,2念1,2念3,2念4,3念1,3念2,3念4,4念1,4念2,4念3", 'guoguan', 'gg2_', 1)
                },
                {
                    'name': '后三',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr("1番,2番,3番,4番,1正,2正,3正,4正,1-2角,2-3角,3-4角,1-4角,1念2，1念3,1念4,2念1,2念3,2念4,3念1,3念2,3念4,4念1,4念2,4念3", 'guoguan', 'gg3_', 1)
                },
            ]
            },
        ];
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
                    {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr("龙,虎,和", 'ball_6', 'z', 5)},
                ],
            }, {
                'name': '第一球', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_1', 'a', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_1', 'a', 11)},
                ],
            }, {
                'name': '第二球', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_2', 'b', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_2', 'b', 11)},
                ],
            }, {
                'name': '第三球', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_3', 'c', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_3', 'c', 11)},
                ],
            }, {
                'name': '第四球', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_4', 'd', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr("大,小,单,双", 'ball_4', 'd', 11)},
                ],
            }, {
                'name': '第五球', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr("0,1,2,3,4,5,6,7,8,9", 'ball_5', 'e', 1)
                    },
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
                    {
                        'name': '梭哈',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('五条,四条,葫芦,顺子,三条,两对,一对,散号', 'ball_11', 'j', 1)
                    },
                ],
            },
        ];
        plays['pk10'] = [
            {
                'name': '1~10', 'tmpl': 'column', 'units': [
                {'name': '冠军', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_1', 'a', 1)},
                {'name': '亚军', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_2', 'b', 1)},
                {'name': '季军', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_3', 'c', 1)},
                {'name': '第4名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_4', 'd', 1)},
                {'name': '第5名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_5', 'e', 1)},
                {'name': '第6名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_6', 'f', 1)},
                {'name': '第7名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_7', 'g', 1)},
                {'name': '第8名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_8', 'h', 1)},
                {'name': '第9名', 'func': 'idx', 'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_9', 'i', 1)},
                {
                    'name': '第10名',
                    'func': 'idx',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_10', 'j', 1)
                },
            ],
            }, {
                'name': '两面', 'tmpl': 'column', 'units': [
                    {
                        'name': '冠军', 'func': 'idx', 'nums': {
                        '大': {'type': 'ball_1', 'play_method': 'a11'},
                        '小': {'type': 'ball_1', 'play_method': 'a12'},
                        '单': {'type': 'ball_1', 'play_method': 'a13'},
                        '双': {'type': 'ball_1', 'play_method': 'a14'},
                        '龙': {'type': 'ball_13', 'play_method': 'l1'},
                        '虎': {'type': 'ball_13', 'play_method': 'l2'},
                    }
                    },
                    {
                        'name': '亚军', 'func': 'idx', 'nums': {
                        '大': {'type': 'ball_2', 'play_method': 'b11'},
                        '小': {'type': 'ball_2', 'play_method': 'b12'},
                        '单': {'type': 'ball_2', 'play_method': 'b13'},
                        '双': {'type': 'ball_2', 'play_method': 'b14'},
                        '龙': {'type': 'ball_13', 'play_method': 'l3'},
                        '虎': {'type': 'ball_13', 'play_method': 'l4'},
                    }
                    },
                    {
                        'name': '季军', 'func': 'idx', 'nums': {
                        '大': {'type': 'ball_3', 'play_method': 'c11'},
                        '小': {'type': 'ball_3', 'play_method': 'c12'},
                        '单': {'type': 'ball_3', 'play_method': 'c13'},
                        '双': {'type': 'ball_3', 'play_method': 'c14'},
                        '龙': {'type': 'ball_13', 'play_method': 'l5'},
                        '虎': {'type': 'ball_13', 'play_method': 'l6'},
                    }
                    },
                    {
                        'name': '第4名', 'func': 'idx', 'nums': {
                        '大': {'type': 'ball_4', 'play_method': 'd11'},
                        '小': {'type': 'ball_4', 'play_method': 'd12'},
                        '单': {'type': 'ball_4', 'play_method': 'd13'},
                        '双': {'type': 'ball_4', 'play_method': 'd14'},
                        '龙': {'type': 'ball_13', 'play_method': 'l7'},
                        '虎': {'type': 'ball_13', 'play_method': 'l8'},
                    }
                    },
                    {
                        'name': '第5名', 'func': 'idx', 'nums': {
                        '大': {'type': 'ball_5', 'play_method': 'e11'},
                        '小': {'type': 'ball_5', 'play_method': 'e12'},
                        '单': {'type': 'ball_5', 'play_method': 'e13'},
                        '双': {'type': 'ball_5', 'play_method': 'e14'},
                        '龙': {'type': 'ball_13', 'play_method': 'l9'},
                        '虎': {'type': 'ball_13', 'play_method': 'l10'},
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
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_1', 'a', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_1', 'a', 11)},
                    {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_13', 'l', 1)},
                ],
            }, {
                'name': '亚军', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_2', 'b', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_2', 'b', 11)},
                    {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_13', 'l', 3)},
                ],
            }, {
                'name': '季军', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_3', 'c', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_3', 'c', 11)},
                    {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_13', 'l', 5)},
                ],
            }, {
                'name': '第4名', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_4', 'd', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_4', 'd', 11)},
                    {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_13', 'l', 7)},
                ],
            }, {
                'name': '第5名', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_5', 'e', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_5', 'e', 11)},
                    {'name': '龙虎', 'func': 'idx', 'nums': this.getPlayUnitByStr('龙,虎', 'ball_13', 'l', 9)},
                ],
            }, {
                'name': '第6名', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_6', 'f', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_6', 'f', 11)},
                ],
            }, {
                'name': '第7名', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_7', 'g', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_7', 'g', 11)},
                ],
            }, {
                'name': '第8名', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_8', 'h', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_8', 'h', 11)},
                ],
            }, {
                'name': '第9名', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_9', 'i', 1)
                    },
                    {'name': '大小单双', 'func': 'idx', 'nums': this.getPlayUnitByStr('大,小,单,双', 'ball_9', 'i', 11)},
                ],
            }, {
                'name': '第10名', 'tmpl': 'list', 'units': [
                    {
                        'name': '定位',
                        'func': 'idx',
                        'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10', 'ball_10', 'j', 1)
                    },
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
                'name': '正码特', 'tmpl': 'ddl', 'units': [
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
                'name': '过关', 'tmpl': 'enum_lhc_gg', 'units': [
                {
                    'name': '正码1', 'func': 'idx', 'nums': {
                    '大': {'type': 'guoguan', 'play_method': 'guoguan1_da', 'seGroup': 1},
                    '小': {'type': 'guoguan', 'play_method': 'guoguan1_xiao', 'seGroup': 1},
                    '单': {'type': 'guoguan', 'play_method': 'guoguan1_dan', 'seGroup': 2},
                    '双': {'type': 'guoguan', 'play_method': 'guoguan1_shuang', 'seGroup': 2},
                    '红波': {'type': 'guoguan', 'play_method': 'guoguan1_red', 'seGroup': 3},
                    '绿波': {'type': 'guoguan', 'play_method': 'guoguan1_green', 'seGroup': 3},
                    '蓝波': {'type': 'guoguan', 'play_method': 'guoguan1_blue', 'seGroup': 3},
                }
                },
                {
                    'name': '正码2', 'func': 'idx', 'nums': {
                    '大': {'type': 'guoguan', 'play_method': 'guoguan2_da', 'seGroup': 1},
                    '小': {'type': 'guoguan', 'play_method': 'guoguan2_xiao', 'seGroup': 1},
                    '单': {'type': 'guoguan', 'play_method': 'guoguan2_dan', 'seGroup': 2},
                    '双': {'type': 'guoguan', 'play_method': 'guoguan2_shuang', 'seGroup': 2},
                    '红波': {'type': 'guoguan', 'play_method': 'guoguan2_red', 'seGroup': 3},
                    '绿波': {'type': 'guoguan', 'play_method': 'guoguan2_green', 'seGroup': 3},
                    '蓝波': {'type': 'guoguan', 'play_method': 'guoguan2_blue', 'seGroup': 3},
                }
                },
                {
                    'name': '正码3', 'func': 'idx', 'nums': {
                    '大': {'type': 'guoguan', 'play_method': 'guoguan3_da', 'seGroup': 1},
                    '小': {'type': 'guoguan', 'play_method': 'guoguan3_xiao', 'seGroup': 1},
                    '单': {'type': 'guoguan', 'play_method': 'guoguan3_dan', 'seGroup': 2},
                    '双': {'type': 'guoguan', 'play_method': 'guoguan3_shuang', 'seGroup': 2},
                    '红波': {'type': 'guoguan', 'play_method': 'guoguan3_red', 'seGroup': 3},
                    '绿波': {'type': 'guoguan', 'play_method': 'guoguan3_green', 'seGroup': 3},
                    '蓝波': {'type': 'guoguan', 'play_method': 'guoguan3_blue', 'seGroup': 3},
                }
                },
                {
                    'name': '正码4', 'func': 'idx', 'nums': {
                    '大': {'type': 'guoguan', 'play_method': 'guoguan4_da', 'seGroup': 1},
                    '小': {'type': 'guoguan', 'play_method': 'guoguan4_xiao', 'seGroup': 1},
                    '单': {'type': 'guoguan', 'play_method': 'guoguan4_dan', 'seGroup': 2},
                    '双': {'type': 'guoguan', 'play_method': 'guoguan4_shuang', 'seGroup': 2},
                    '红波': {'type': 'guoguan', 'play_method': 'guoguan4_red', 'seGroup': 3},
                    '绿波': {'type': 'guoguan', 'play_method': 'guoguan4_green', 'seGroup': 3},
                    '蓝波': {'type': 'guoguan', 'play_method': 'guoguan4_blue', 'seGroup': 3},
                }
                },
                {
                    'name': '正码5', 'func': 'idx', 'nums': {
                    '大': {'type': 'guoguan', 'play_method': 'guoguan5_da', 'seGroup': 1},
                    '小': {'type': 'guoguan', 'play_method': 'guoguan5_xiao', 'seGroup': 1},
                    '单': {'type': 'guoguan', 'play_method': 'guoguan5_dan', 'seGroup': 2},
                    '双': {'type': 'guoguan', 'play_method': 'guoguan5_shuang', 'seGroup': 2},
                    '红波': {'type': 'guoguan', 'play_method': 'guoguan5_red', 'seGroup': 3},
                    '绿波': {'type': 'guoguan', 'play_method': 'guoguan5_green', 'seGroup': 3},
                    '蓝波': {'type': 'guoguan', 'play_method': 'guoguan5_blue', 'seGroup': 3},
                }
                },
                {
                    'name': '正码6', 'func': 'idx', 'nums': {
                    '大': {'type': 'guoguan', 'play_method': 'guoguan6_da', 'seGroup': 1},
                    '小': {'type': 'guoguan', 'play_method': 'guoguan6_xiao', 'seGroup': 1},
                    '单': {'type': 'guoguan', 'play_method': 'guoguan6_dan', 'seGroup': 2},
                    '双': {'type': 'guoguan', 'play_method': 'guoguan6_shuang', 'seGroup': 2},
                    '红波': {'type': 'guoguan', 'play_method': 'guoguan6_red', 'seGroup': 3},
                    '绿波': {'type': 'guoguan', 'play_method': 'guoguan6_green', 'seGroup': 3},
                    '蓝波': {'type': 'guoguan', 'play_method': 'guoguan6_blue', 'seGroup': 3},
                }
                },
            ]
            },
            {
                'name': '连码', 'tmpl': 'ddl', 'units': [
                {
                    'name': '二中全',
                    'func': 'comb_2_2',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'lianma2', 'lianma2_', 1)
                },
                {
                    'name': '二中特',
                    'func': 'comb_2_2',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'lianma2te', 'lianma2te_', 1)
                },
                {
                    'name': '特串',
                    'func': 'comb_2_2',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'lianma_techuan', 'lianma_techuan_', 1)
                },
                {
                    'name': '三中全',
                    'func': 'comb_3_3',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'lianma3', 'lianma3_', 1)
                },
                {
                    'name': '三中二',
                    'func': 'comb_3_2',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'lianma3z2', 'lianma3z2_', 1)
                },
                {
                    'name': '四中全',
                    'func': 'comb_4_4',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'lianma4', 'lianma4_', 1)
                },
            ]
            },
            {
                'name': '半波', 'tmpl': 'list', 'units': [
                {
                    'name': '半波', 'func': 'idx', 'nums': {
                    '红大': {'type': 'halfball', 'play_method': 'halfball_redda'},
                    '红小': {'type': 'halfball', 'play_method': 'halfball_redxiao'},
                    '红单': {'type': 'halfball', 'play_method': 'halfball_reddan'},
                    '红双': {'type': 'halfball', 'play_method': 'halfball_redshuang'},
                    '蓝大': {'type': 'halfball', 'play_method': 'halfball_blueda'},
                    '蓝小': {'type': 'halfball', 'play_method': 'halfball_bluexiao'},
                    '蓝单': {'type': 'halfball', 'play_method': 'halfball_bluedan'},
                    '蓝双': {'type': 'halfball', 'play_method': 'halfball_blueshuang'},
                    '绿大': {'type': 'halfball', 'play_method': 'halfball_greenda'},
                    '绿小': {'type': 'halfball', 'play_method': 'halfball_greenxiao'},
                    '绿单': {'type': 'halfball', 'play_method': 'halfball_greendan'},
                    '绿双': {'type': 'halfball', 'play_method': 'halfball_greenshuang'},
                    '红合单': {'type': 'halfball', 'play_method': 'halfball_redhedan'},
                    '红合双': {'type': 'halfball', 'play_method': 'halfball_redheshuang'},
                    '蓝合单': {'type': 'halfball', 'play_method': 'halfball_bluehedan'},
                    '蓝合双': {'type': 'halfball', 'play_method': 'halfball_blueheshuang'},
                    '绿合单': {'type': 'halfball', 'play_method': 'halfball_greenhedan'},
                    '绿合双': {'type': 'halfball', 'play_method': 'halfball_greenheshuang'},
                }
                },
            ],
            },
            {
                'name': '一肖/尾数', 'tmpl': 'ddl', 'units': [
                {
                    'name': '一肖', 'func': 'idx', 'nums': {
                    '鼠': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_shu'},
                    '牛': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_niu'},
                    '虎': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_hu'},
                    '兔': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_tu'},
                    '龙': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_long'},
                    '蛇': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_she'},
                    '马': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_ma'},
                    '羊': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_yang'},
                    '猴': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_hou'},
                    '鸡': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_ji'},
                    '狗': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_gou'},
                    '猪': {'type': 'one_zoudiac', 'play_method': 'one_zoudiac_zhu'},
                }
                },
                {
                    'name': '尾数', 'func': 'idx',
                    'nums': this.getPlayUnitByStr('0尾,1尾,2尾,3尾,4尾,5尾,6尾,7尾,8尾,9尾', 'ballend', 'ballend_', 0)
                },
            ],
            },
            {
                'name': '特码生肖', 'tmpl': 'list', 'units': [
                {
                    'name': '特码生肖', 'func': 'idx', 'nums': {
                    '鼠': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_shu'},
                    '牛': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_niu'},
                    '虎': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_hu'},
                    '兔': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_tu'},
                    '龙': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_long'},
                    '蛇': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_she'},
                    '马': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_ma'},
                    '羊': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_yang'},
                    '猴': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_hou'},
                    '鸡': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_ji'},
                    '狗': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_gou'},
                    '猪': {'type': 'tema_zoudiac', 'play_method': 'tema_zoudiac_zhu'},
                }
                },
            ]
            },
            {
                'name': '合肖', 'tmpl': 'ddl', 'units': [
                {
                    'name': '合肖二肖', 'func': 'limit_2', 'nums': {
                    '鼠': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_shu'},
                    '牛': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_niu'},
                    '虎': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_hu'},
                    '兔': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_tu'},
                    '龙': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_long'},
                    '蛇': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_she'},
                    '马': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_ma'},
                    '羊': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_yang'},
                    '猴': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_hou'},
                    '鸡': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_ji'},
                    '狗': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_gou'},
                    '猪': {'type': 'he_zoudiac2', 'play_method': 'he_zoudiac2_zhu'},
                }
                },
                {
                    'name': '合肖三肖', 'func': 'limit_3', 'nums': {
                    '鼠': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_shu'},
                    '牛': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_niu'},
                    '虎': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_hu'},
                    '兔': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_tu'},
                    '龙': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_long'},
                    '蛇': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_she'},
                    '马': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_ma'},
                    '羊': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_yang'},
                    '猴': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_hou'},
                    '鸡': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_ji'},
                    '狗': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_gou'},
                    '猪': {'type': 'he_zoudiac3', 'play_method': 'he_zoudiac3_zhu'},
                }
                },
                {
                    'name': '合肖四肖', 'func': 'limit_4', 'nums': {
                    '鼠': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_shu'},
                    '牛': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_niu'},
                    '虎': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_hu'},
                    '兔': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_tu'},
                    '龙': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_long'},
                    '蛇': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_she'},
                    '马': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_ma'},
                    '羊': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_yang'},
                    '猴': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_hou'},
                    '鸡': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_ji'},
                    '狗': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_gou'},
                    '猪': {'type': 'he_zoudiac4', 'play_method': 'he_zoudiac4_zhu'},
                }
                },
                {
                    'name': '合肖五肖', 'func': 'limit_5', 'nums': {
                    '鼠': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_shu'},
                    '牛': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_niu'},
                    '虎': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_hu'},
                    '兔': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_tu'},
                    '龙': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_long'},
                    '蛇': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_she'},
                    '马': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_ma'},
                    '羊': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_yang'},
                    '猴': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_hou'},
                    '鸡': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_ji'},
                    '狗': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_gou'},
                    '猪': {'type': 'he_zoudiac5', 'play_method': 'he_zoudiac5_zhu'},
                }
                },
                {
                    'name': '合肖六肖', 'func': 'limit_6', 'nums': {
                    '鼠': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_shu'},
                    '牛': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_niu'},
                    '虎': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_hu'},
                    '兔': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_tu'},
                    '龙': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_long'},
                    '蛇': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_she'},
                    '马': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_ma'},
                    '羊': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_yang'},
                    '猴': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_hou'},
                    '鸡': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_ji'},
                    '狗': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_gou'},
                    '猪': {'type': 'he_zoudiac6', 'play_method': 'he_zoudiac6_zhu'},
                }
                },
                {
                    'name': '合肖七肖', 'func': 'limit_7', 'nums': {
                    '鼠': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_shu'},
                    '牛': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_niu'},
                    '虎': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_hu'},
                    '兔': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_tu'},
                    '龙': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_long'},
                    '蛇': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_she'},
                    '马': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_ma'},
                    '羊': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_yang'},
                    '猴': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_hou'},
                    '鸡': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_ji'},
                    '狗': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_gou'},
                    '猪': {'type': 'he_zoudiac7', 'play_method': 'he_zoudiac7_zhu'},
                }
                },
                {
                    'name': '合肖八肖', 'func': 'limit_8', 'nums': {
                    '鼠': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_shu'},
                    '牛': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_niu'},
                    '虎': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_hu'},
                    '兔': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_tu'},
                    '龙': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_long'},
                    '蛇': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_she'},
                    '马': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_ma'},
                    '羊': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_yang'},
                    '猴': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_hou'},
                    '鸡': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_ji'},
                    '狗': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_gou'},
                    '猪': {'type': 'he_zoudiac8', 'play_method': 'he_zoudiac8_zhu'},
                }
                },
                {
                    'name': '合肖九肖', 'func': 'limit_9', 'nums': {
                    '鼠': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_shu'},
                    '牛': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_niu'},
                    '虎': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_hu'},
                    '兔': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_tu'},
                    '龙': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_long'},
                    '蛇': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_she'},
                    '马': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_ma'},
                    '羊': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_yang'},
                    '猴': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_hou'},
                    '鸡': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_ji'},
                    '狗': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_gou'},
                    '猪': {'type': 'he_zoudiac9', 'play_method': 'he_zoudiac9_zhu'},
                }
                },
                {
                    'name': '合肖十肖', 'func': 'limit_10', 'nums': {
                    '鼠': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_shu'},
                    '牛': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_niu'},
                    '虎': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_hu'},
                    '兔': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_tu'},
                    '龙': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_long'},
                    '蛇': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_she'},
                    '马': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_ma'},
                    '羊': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_yang'},
                    '猴': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_hou'},
                    '鸡': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_ji'},
                    '狗': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_gou'},
                    '猪': {'type': 'he_zoudiac10', 'play_method': 'he_zoudiac10_zhu'},
                }
                },
                {
                    'name': '合肖十一肖', 'func': 'limit_11', 'nums': {
                    '鼠': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_shu'},
                    '牛': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_niu'},
                    '虎': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_hu'},
                    '兔': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_tu'},
                    '龙': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_long'},
                    '蛇': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_she'},
                    '马': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_ma'},
                    '羊': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_yang'},
                    '猴': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_hou'},
                    '鸡': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_ji'},
                    '狗': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_gou'},
                    '猪': {'type': 'he_zoudiac11', 'play_method': 'he_zoudiac11_zhu'},
                }
                },
            ]
            },
            {
                'name': '连肖中', 'tmpl': 'list', 'units': [
                {
                    'name': '二肖连中', 'func': 'comb_2_2', 'nums': {
                    '鼠': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_shu'},
                    '牛': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_niu'},
                    '虎': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_hu'},
                    '兔': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_tu'},
                    '龙': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_long'},
                    '蛇': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_she'},
                    '马': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_ma'},
                    '羊': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_yang'},
                    '猴': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_hou'},
                    '鸡': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_ji'},
                    '狗': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_gou'},
                    '猪': {'type': 'lian_zoudiac2', 'play_method': 'lian_zoudiac2_zhu'},
                }
                },
                {
                    'name': '三肖连中', 'func': 'comb_3_3', 'nums': {
                    '鼠': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_shu'},
                    '牛': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_niu'},
                    '虎': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_hu'},
                    '兔': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_tu'},
                    '龙': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_long'},
                    '蛇': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_she'},
                    '马': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_ma'},
                    '羊': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_yang'},
                    '猴': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_hou'},
                    '鸡': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_ji'},
                    '狗': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_gou'},
                    '猪': {'type': 'lian_zoudiac3', 'play_method': 'lian_zoudiac3_zhu'},
                }
                },
                {
                    'name': '四肖连中', 'func': 'comb_4_4', 'nums': {
                    '鼠': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_shu'},
                    '牛': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_niu'},
                    '虎': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_hu'},
                    '兔': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_tu'},
                    '龙': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_long'},
                    '蛇': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_she'},
                    '马': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_ma'},
                    '羊': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_yang'},
                    '猴': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_hou'},
                    '鸡': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_ji'},
                    '狗': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_gou'},
                    '猪': {'type': 'lian_zoudiac4', 'play_method': 'lian_zoudiac4_zhu'},
                }
                },
                {
                    'name': '五肖连中', 'func': 'comb_5_5', 'nums': {
                    '鼠': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_shu'},
                    '牛': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_niu'},
                    '虎': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_hu'},
                    '兔': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_tu'},
                    '龙': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_long'},
                    '蛇': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_she'},
                    '马': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_ma'},
                    '羊': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_yang'},
                    '猴': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_hou'},
                    '鸡': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_ji'},
                    '狗': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_gou'},
                    '猪': {'type': 'lian_zoudiac5', 'play_method': 'lian_zoudiac5_zhu'},
                }
                },
            ]
            },
            {
                'name': '连肖不中', 'tmpl': 'list', 'units': [
                {
                    'name': '二肖连不中', 'func': 'comb_2_2', 'nums': {
                    '鼠': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_shu'},
                    '牛': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_niu'},
                    '虎': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_hu'},
                    '兔': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_tu'},
                    '龙': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_long'},
                    '蛇': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_she'},
                    '马': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_ma'},
                    '羊': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_yang'},
                    '猴': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_hou'},
                    '鸡': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_ji'},
                    '狗': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_gou'},
                    '猪': {'type': 'lian_zoudiac2not', 'play_method': 'lian_zoudiac2not_zhu'},
                }
                },
                {
                    'name': '三肖连不中', 'func': 'comb_3_3', 'nums': {
                    '鼠': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_shu'},
                    '牛': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_niu'},
                    '虎': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_hu'},
                    '兔': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_tu'},
                    '龙': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_long'},
                    '蛇': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_she'},
                    '马': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_ma'},
                    '羊': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_yang'},
                    '猴': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_hou'},
                    '鸡': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_ji'},
                    '狗': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_gou'},
                    '猪': {'type': 'lian_zoudiac3not', 'play_method': 'lian_zoudiac3not_zhu'},
                }
                },
                {
                    'name': '四肖连不中', 'func': 'comb_4_4', 'nums': {
                    '鼠': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_shu'},
                    '牛': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_niu'},
                    '虎': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_hu'},
                    '兔': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_tu'},
                    '龙': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_long'},
                    '蛇': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_she'},
                    '马': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_ma'},
                    '羊': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_yang'},
                    '猴': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_hou'},
                    '鸡': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_ji'},
                    '狗': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_gou'},
                    '猪': {'type': 'lian_zoudiac4not', 'play_method': 'lian_zoudiac4not_zhu'},
                }
                },
            ]
            },
            {
                'name': '连尾中', 'tmpl': 'ddl', 'units': [
                {
                    'name': '二尾连中', 'func': 'comb_2_2',
                    'nums': this.getPlayUnitByStr('0尾,1尾,2尾,3尾,4尾,5尾,6尾,7尾,8尾,9尾', 'lian_wei2', 'lian_wei2_', 0)
                },
                {
                    'name': '三尾连中', 'func': 'comb_3_3',
                    'nums': this.getPlayUnitByStr('0尾,1尾,2尾,3尾,4尾,5尾,6尾,7尾,8尾,9尾', 'lian_wei3', 'lian_wei3_', 0)
                },
                {
                    'name': '四尾连中', 'func': 'comb_4_4',
                    'nums': this.getPlayUnitByStr('0尾,1尾,2尾,3尾,4尾,5尾,6尾,7尾,8尾,9尾', 'lian_wei4', 'lian_wei4_', 0)
                },
            ]
            },
            {
                'name': '连尾不中', 'tmpl': 'ddl', 'units': [
                {
                    'name': '二尾连不中', 'func': 'comb_2_2',
                    'nums': this.getPlayUnitByStr('0尾,1尾,2尾,3尾,4尾,5尾,6尾,7尾,8尾,9尾', 'lian_wei2not', 'lian_wei2not_', 0)
                },
                {
                    'name': '三尾连不中', 'func': 'comb_3_3',
                    'nums': this.getPlayUnitByStr('0尾,1尾,2尾,3尾,4尾,5尾,6尾,7尾,8尾,9尾', 'lian_wei3not', 'lian_wei3not_', 0)
                },
                {
                    'name': '四尾连不中', 'func': 'comb_4_4',
                    'nums': this.getPlayUnitByStr('0尾,1尾,2尾,3尾,4尾,5尾,6尾,7尾,8尾,9尾', 'lian_wei4not', 'lian_wei4not_', 0)
                },
            ]
            },
            {
                'name': '全不中', 'tmpl': 'ddl', 'units': [
                {
                    'name': '五不中',
                    'func': 'comb_5_5',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'quanbuzhong5', 'quanbuzhong5_', 1)
                },
                {
                    'name': '六不中',
                    'func': 'comb_6_6',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'quanbuzhong6', 'quanbuzhong6_', 1)
                },
                {
                    'name': '七不中',
                    'func': 'comb_7_7',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'quanbuzhong7', 'quanbuzhong7_', 1)
                },
                {
                    'name': '八不中',
                    'func': 'comb_8_8',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'quanbuzhong8', 'quanbuzhong8_', 1)
                },
                {
                    'name': '九不中',
                    'func': 'comb_9_9',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'quanbuzhong9', 'quanbuzhong9_', 1)
                },
                {
                    'name': '十不中',
                    'func': 'comb_10_10',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'quanbuzhong10', 'quanbuzhong10_', 1)
                },
                {
                    'name': '十一不中',
                    'func': 'comb_11_11',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'quanbuzhong11', 'quanbuzhong11_', 1)
                },
                {
                    'name': '十二不中',
                    'func': 'comb_12_12',
                    'nums': this.getPlayUnitByStr('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49', 'quanbuzhong12', 'quanbuzhong12_', 1)
                },
            ]
            },
        ];
        return plays;
    }

    /**
     * 【私有】快速转换玩法号码
     * @param numsStr
     * @param unit
     * @param pre
     * @param i1
     * @returns {{}}
     */
    private getPlayUnitByStr(numsStr, unit, pre, i1) {
        var nums = numsStr.split(',');
        var playNums = {};
        for (var i in nums) {
            playNums[nums[i]] = {'type': unit, 'play_method': pre + (parseInt(i) + parseInt(i1))}
        }
        return playNums;
    }

    /**
     * 获得玩法赔率
     * @param prizes
     * @param gameKey
     * @returns {{}}
     */
    getPlayPrizes(prizes, gameKey) {
        var prizes1 = this.getLotteryPrizes(prizes);
        var lotteryCategory = this.getLotteryCategory(gameKey);
        var plays = this.getLotteryPlays()[lotteryCategory];
        var lotteryPrizes = [];
        for (var i in plays) {
            lotteryPrizes[i] = plays[i];
            for (var j in plays[i].units) {
                for (var k in plays[i].units[j]['nums']) {
                    var num = plays[i]['units'][j]['nums'][k];
                    var numPrice = prizes1[num['type']][num['play_method']];
                    num['price'] = numPrice.price;
                    num['name'] = k;
                    num['unit'] = plays[i].units[j]['name'];
                    lotteryPrizes[i].units[j].nums[k] = num;
                }
            }
        }
        return lotteryPrizes;
    }

    /**
     * 将开奖号码解析对应的号码类型
     * @param gameKey
     * @param opencode 格式： 1,2,3,4,5
     */
    getOpencodeNums(gameKey, opencode) {
        var lotteryCategory = this.getLotteryCategory(gameKey);
        var nums = {};
        nums['opencode'] = opencode;
        nums['nums'] = opencode.split(',');
        switch (lotteryCategory) {
            case 'ssc':
                nums['codes'] = this.ssc(nums['nums']);
                break;
            case 'pk10':
                nums['codes'] = this.ssc(nums['nums']);
                break;
            case 'lhc':
                nums['codes'] = this.lhc(nums['nums']);
                break;
        }
        return nums;
    }

    // private kl8($nums)
    // {
    //   var $idxs = [
    //     '第1球',
    //     '第2球',
    //     '第3球',
    //     '第4球',
    //     '第5球',
    //     '第6球',
    //     '第7球',
    //     '第8球',
    //     '第9球',
    //     '第10球',
    //     '第11球',
    //     '第12球',
    //     '第13球',
    //     '第14球',
    //     '第15球',
    //     '第16球',
    //     '第17球',
    //     '第18球',
    //     '第19球',
    //     '第20球',
    //   ];
    //   var $codes = [];
    //   var $countSing = 0;
    //   var $countDouble = 0;
    //   var $countPre = 0;
    //   var $countSuff = 0;
    //   for(var $i in $nums){
    //     var $num=parseInt($nums[$i]);
    //     $codes[$idxs[$i]]['号码'] = $num; // 定位-数字
    //     $codes[$idxs[$i]]['大小'] = this.getBigOrSmall($num, 40); // 定位-大小
    //     $codes[$idxs[$i]]['单双'] = this.getSingOrDoub($num); // 定位-单双
    //     $codes[$idxs[$i]]['大小'] == '大' ? $countSuff++ : $countPre++;
    //     $codes[$idxs[$i]]['单双'] == '单' ? $countSing++ : $countDouble++;
    //   }
    //
    //   $allSum = array_sum($nums);
    //   $codes['总和']['总和'] = $allSum; // 总和-数字
    //
    //   if ($allSum == 810) {
    //     $codes['总和']['单双'] = '810';
    //     $codes['总和']['大小'] = '810';
    //   } else {
    //     $codes['总和']['单双'] = this.getSingOrDoub($allSum, Array(810)); // 总和-大小
    //     $codes['总和']['大小'] = this.getBigOrSmall($allSum, 810); // 总和-大小
    //   }
    //
    //   if ($countSing > $countDouble) {
    //     $codes['多少']['单双'] = '单多';
    //   } elseif ($countSing < $countDouble) {
    //   $codes['多少']['单双'] = '双多';
    // } else {
    //   $codes['多少']['单双'] = '和';
    // }
    //
    //   if ($countPre > $countSuff) {
    //     $codes['多少']['大小'] = '前多';
    //   } elseif ($countPre < $countSuff) {
    //   $codes['多少']['大小'] = '后多';
    // } else {
    //   $codes['多少']['大小'] = '和';
    // }
    //
    //   $codes['总和']['五行'] = this.getKl8WX($allSum);
    //
    //   return $codes;
    // }
    // private pc28($nums)
    // {
    //   unset($nums[3]);
    //   $idxs = Array(
    //     '第1球',
    //     '第2球',
    //     '第3球',
    //   );
    //   $codes = Array();
    //   foreach ($nums as $i => $num) {
    //   $num = intval($num);
    //   $codes[$idxs[$i]]['号码'] = $num; // 定位-数字
    //   $codes[$idxs[$i]]['大小'] = this.getBigOrSmall($num, 4); // 定位-大小
    //   $codes[$idxs[$i]]['单双'] = this.getSingOrDoub($num); // 定位-单双
    // }
    //   $allSum = array_sum($nums);
    //   $codes['总和'] = this.getPc28Type(Array($nums[0], $nums[1], $nums[2])); // 总和-数字、极值
    //   $codes['总和']['大小'] = this.getBigOrSmall($allSum, 13); // 总和-大小
    //   $codes['总和']['单双'] = this.getSingOrDoub($allSum); // 总和-单双
    //   $codes['总和']['和'] = in_array($codes['总和']['总和'], Array(13, 14));
    //   return $codes;
    // }
    // private k3($nums)
    // {
    //   $idxs = Array(
    //     '第1球',
    //     '第2球',
    //     '第3球',
    //   );
    //   $codes = Array();
    //   foreach ($nums as $i => $num) {
    //   $num = intval($num);
    //   $codes[$idxs[$i]]['号码'] = $num; // 定位-数字
    //   $codes[$idxs[$i]]['大小'] = this.getBigOrSmall($num, 4); // 定位-大小
    //   $codes[$idxs[$i]]['单双'] = this.getSingOrDoub($num); // 定位-单双
    // }
    //   $allSum = array_sum($nums);
    //   $codes['总和'] = this.getK3Mult($nums);
    //   $codes['总和']['总和'] = $allSum; // 总和-数字
    //   $codes['总和']['大小'] = this.getBigOrSmall($allSum, 10, array(3, 18)); // 总和，小：4~10；大11~17（豹子全和）
    //   $codes['总和']['单双'] = this.getSingOrDoub($allSum); // 总和-大小
    //
    //   return $codes;
    // }
    //   private kl10($nums)
    //   {
    //     $idxs = Array(
    //       '第1球',
    //       '第2球',
    //       '第3球',
    //       '第4球',
    //       '第5球',
    //       '第6球',
    //       '第7球',
    //       '第8球',
    //     );
    //     $codes = Array();
    //     foreach ($nums as $i => $num) {
    //     $num = intval($num);
    //     $codes[$idxs[$i]]['号码'] = $num; // 定位-数字
    //     $codes[$idxs[$i]]['大小'] = this.getBigOrSmall($num, 10); // 定位-大小，>10大；<=10小
    //     $codes[$idxs[$i]]['单双'] = this.getSingOrDoub($num); // 定位-单双
    //
    //     if ($num % 10 > 4) {
    //       $codes[$idxs[$i]]['尾数大小'] = '尾大';
    //     } else {
    //       $codes[$idxs[$i]]['尾数大小'] = '尾小';
    //     }
    //
    //     if ($num <= 7) {
    //       $codes[$idxs[$i]]['中发白'] = '中';
    //     } elseif ($num > 7 && $num <= 14) {
    //       $codes[$idxs[$i]]['中发白'] = '发';
    //     } else {
    //       $codes[$idxs[$i]]['中发白'] = '白';
    //     }
    //
    //     switch ($num % 4) {
    //       case 0:
    //         $codes[$idxs[$i]]['方位'] = '北';
    //         break;
    //       case 1:
    //         $codes[$idxs[$i]]['方位'] = '东';
    //         break;
    //       case 2:
    //         $codes[$idxs[$i]]['方位'] = '南';
    //         break;
    //       case 3:
    //         $codes[$idxs[$i]]['方位'] = '西';
    //         break;
    //     }
    //   }
    //     $allSum = array_sum($nums);
    //     $codes['总和']['总和'] = $allSum; // 总和-数字
    //     $codes['总和']['单双'] = this.getSingOrDoub($allSum); // 总和-大小
    //     $codes['总和']['大小'] = this.getBigOrSmall($allSum, 83, Array(84)); // 总和-大小
    //
    //     if ($allSum % 10 > 4) {
    //       $codes['总和']['尾数大小'] = '尾大';
    //     } else {
    //       $codes['总和']['尾数大小'] = '尾小';
    //     }
    // //        if ($allSum % 10 % 2 == 0) {
    // //            $codes['总和']['尾数单双'] = '尾双';
    // //        } else {
    // //            $codes['总和']['尾数单双'] = '尾单';
    // //        }
    //     $codes['龙虎']['龙虎'] = this.getVingtEtUn($nums[0], $nums[7]); // 总和-龙虎
    //     return $codes;
    //   }
    //   private xync($nums)
    //   {
    //     $idxs = Array(
    //       '第1球',
    //       '第2球',
    //       '第3球',
    //       '第4球',
    //       '第5球',
    //       '第6球',
    //       '第7球',
    //       '第8球',
    //     );
    //     $codes = Array();
    //     foreach ($nums as $i => $num) {
    //     $num = intval($num);
    //     $codes[$idxs[$i]]['号码'] = $num; // 定位-数字
    //     $codes[$idxs[$i]]['大小'] = this.getBigOrSmall($num, 10); // 定位-大小，>10大；<=10小
    //     $codes[$idxs[$i]]['单双'] = this.getSingOrDoub($num); // 定位-单双
    //
    //     if ($num % 10 > 4) {
    //       $codes[$idxs[$i]]['尾数大小'] = '尾大';
    //     } else {
    //       $codes[$idxs[$i]]['尾数大小'] = '尾小';
    //     }
    //
    //     if ($num <= 7) {
    //       $codes[$idxs[$i]]['中发白'] = '中';
    //     } elseif ($num > 7 && $num <= 14) {
    //       $codes[$idxs[$i]]['中发白'] = '发';
    //     } else {
    //       $codes[$idxs[$i]]['中发白'] = '白';
    //     }
    //
    //     switch ($num % 4) {
    //       case 0:
    //         $codes[$idxs[$i]]['梅兰竹菊'] = '北';
    //         break;
    //       case 1:
    //         $codes[$idxs[$i]]['梅兰竹菊'] = '东';
    //         break;
    //       case 2:
    //         $codes[$idxs[$i]]['梅兰竹菊'] = '南';
    //         break;
    //       case 3:
    //         $codes[$idxs[$i]]['梅兰竹菊'] = '西';
    //         break;
    //     }
    //   }
    //     $allSum = array_sum($nums);
    //     $codes['总和']['总和'] = $allSum; // 总和-数字
    //     $codes['总和']['单双'] = this.getSingOrDoub($allSum); // 总和-大小
    //     $codes['总和']['大小'] = this.getBigOrSmall($allSum, 83, Array(84)); // 总和-大小
    //
    //     if ($allSum % 10 > 4) {
    //       $codes['总和']['尾数大小'] = '尾大';
    //     } else {
    //       $codes['总和']['尾数大小'] = '尾小';
    //     }
    // //        if ($allSum % 10 % 2 == 0) {
    // //            $codes['总和']['尾数单双'] = '尾双';
    // //        } else {
    // //            $codes['总和']['尾数单双'] = '尾单';
    // //        }
    //     if ($nums[0] > $nums[7]) {
    //       $codes['家禽野兽']['家禽野兽'] = '家禽';
    //     } else {
    //       $codes['家禽野兽']['家禽野兽'] = '野兽';
    //     }
    // //        $codes['家禽野兽']['家禽野兽'] = this.getVingtEtUn($nums[0], $nums[7]); // 总和-龙虎
    //     return $codes;
    //   }
    private ssc($nums) {
        var $idxs = [
            '第1球',
            '第2球',
            '第3球',
            '第4球',
            '第5球',
        ];
        var $codes = {};
        for (var $i in $nums) {
            var $num = parseInt($nums[$i]);
            $codes[$idxs[$i]] = {};
            $codes[$idxs[$i]]['号码'] = $num; // 定位-数字
            $codes[$idxs[$i]]['大小'] = this.getBigOrSmall($num, 4); // 定位-大小
            $codes[$idxs[$i]]['单双'] = this.getSingOrDoub($num); // 定位-单双
        }
        var $allSum = this.getArrayCount($nums);
        $codes['总和'] = {};
        $codes['龙虎'] = {};
        $codes['总和']['总和'] = $allSum; // 总和-数字
        $codes['总和']['单双'] = this.getSingOrDoub($allSum); // 总和-大小
        $codes['总和']['大小'] = this.getBigOrSmall($allSum, 22); // 总和-大小
        $codes['龙虎']['龙虎'] = this.getVingtEtUn($nums[0], $nums[4]); // 总和-龙虎
        $codes['总和']['龙虎'] = this.getVingtEtUn($nums[0], $nums[4]); // 总和-龙虎
        $codes['前三'] = this.getSscType([$nums[0], $nums[1], $nums[2]]);
        $codes['中三'] = this.getSscType([$nums[1], $nums[2], $nums[3]]);
        $codes['后三'] = this.getSscType([$nums[2], $nums[3], $nums[4]]);
        return $codes;
    }

    private pk10($nums) {
        var $idxs = [
            '冠军',
            '亚军',
            '第3名',
            '第4名',
            '第5名',
            '第6名',
            '第7名',
            '第8名',
            '第9名',
            '第10名',
        ];
        var $codes = {};
        for (var $i in $nums) {
            var $num = parseInt($nums[$i]);
            $codes[$idxs[$i]] = {};
            $codes[$idxs[$i]]['号码'] = $num; // 定位-数字
            $codes[$idxs[$i]]['大小'] = this.getBigOrSmall($num, 4); // 定位-大小
            $codes[$idxs[$i]]['单双'] = this.getSingOrDoub($num); // 定位-单双
        }
        $codes['冠军']['龙虎'] = this.getVingtEtUn($nums[0], $nums[9]); // 定位1-龙虎
        $codes['亚军']['龙虎'] = this.getVingtEtUn($nums[1], $nums[8]); // 定位2-龙虎
        $codes['第3名']['龙虎'] = this.getVingtEtUn($nums[2], $nums[7]); // 定位3-龙虎
        $codes['第4名']['龙虎'] = this.getVingtEtUn($nums[3], $nums[6]); // 定位4-龙虎
        $codes['第5名']['龙虎'] = this.getVingtEtUn($nums[4], $nums[5]); // 定位5-龙虎
        var $count_gyh = $nums[0] + $nums[1];
        $codes['冠亚和'] = {};
        $codes['冠亚和']['总和'] = $count_gyh; // 冠亚和-数字
        $codes['冠亚和']['大小'] = this.getBigOrSmall($count_gyh, 11); // 冠亚和-大小
        $codes['冠亚和']['单双'] = this.getSingOrDoub($count_gyh); // 冠亚和-单双
        return $codes;
    }

    private lhc($nums) {
        var $idxs = [
            '正码1',
            '正码2',
            '正码3',
            '正码4',
            '正码5',
            '正码6',
            '特码',
        ];
        var $codes = {};
        for (var $i in $nums) {
            var $num = parseInt($nums[$i]);
            $codes[$idxs[$i]] = {};
            $codes[$idxs[$i]]['号码'] = $num; // 定位-数字
            $codes[$idxs[$i]]['大小'] = this.getBigOrSmall($num, 23); // 定位-大小
            $codes[$idxs[$i]]['单双'] = this.getSingOrDoub($num); // 定位-单双
            $codes[$idxs[$i]]['波色'] = this.getLhcColor($num); // 定位-波色
            $codes[$idxs[$i]]['生肖'] = this.getLhcZodiac($num); // 定位-生肖
        }
        // $codes['冠军']['龙虎'] = this.getVingtEtUn($nums[0], $nums[9]); // 定位1-龙虎
        // $codes['亚军']['龙虎'] = this.getVingtEtUn($nums[1], $nums[8]); // 定位2-龙虎
        // $codes['第3名']['龙虎'] = this.getVingtEtUn($nums[2], $nums[7]); // 定位3-龙虎
        // $codes['第4名']['龙虎'] = this.getVingtEtUn($nums[3], $nums[6]); // 定位4-龙虎
        // $codes['第5名']['龙虎'] = this.getVingtEtUn($nums[4], $nums[5]); // 定位5-龙虎
        // var $count_gyh = $nums[0] + $nums[1];
        // $codes['冠亚和']['总和'] = $count_gyh; // 冠亚和-数字
        // $codes['冠亚和']['大小'] = this.getBigOrSmall($count_gyh, 11); // 冠亚和-大小
        // $codes['冠亚和']['单双'] = this.getSingOrDoub($count_gyh); // 冠亚和-单双
        return $codes;
    }

    private getSscType($nums) {
        $nums = $nums.sort();
        // var $type = '杂六';
        var $type = {};
        if (($nums[0] == $nums[1]) && ($nums[0] == $nums[2])) {
            $type = {'name': '豹子', 'class': 'red', 'key': 'z6'};
        } else if ((($nums[1] - $nums[0]) == ($nums[2] - $nums[1])) && (($nums[1] - $nums[0]) == 1) || ($nums == Array(0, 8, 9) || $nums == Array(0, 1, 9))) {
            $type = {'name': '顺子', 'class': 'red', 'key': 'z6'};
        } else if ($nums[0] == $nums[1] || $nums[1] == $nums[2]) {
            $type = {'name': '对子', 'class': 'blue', 'key': 'z6'};
        } else if (($nums[1] - $nums[0]) == 1 || ($nums[2] - $nums[1]) == 1) {
            $type = {'name': '半顺', 'class': 'blue', 'key': 'z6'};
        } else {
            $type = {'name': '杂六', 'class': 'green', 'key': 'z6'};
        }
        var $data = {};
        $data['总和'] = this.getArrayCount($nums);
        $data['类型'] = $type;
        return $data;
    }

    // private getPc28Type($nums)
    // {
    //   $nums = array_values(array_sort($nums));
    //   if (($nums[0] == $nums[1]) && ($nums[0] == $nums[2])) {
    //     $type = '豹子';
    //   } elseif ((($nums[1] - $nums[0]) == ($nums[2] - $nums[1])) && (($nums[1] - $nums[0]) == 1)) {
    //   $type = '顺子';
    // } elseif ($nums[0] == $nums[1] || $nums[1] == $nums[2]) {
    //   $type = '对子';
    // } else {
    //   $type = '';
    // }
    //   $count = array_sum($nums);
    //   if ($count <= 5) {
    //     $limit = '极小'; // 极小
    //   } elseif ($count >= 22) {
    //   $limit = '极大'; // 极大
    // } else {
    //   $limit = '';
    // }
    //   $data = Array();
    //   $data['总和'] = $count; // 定位
    //   $data['类型'] = $type;
    //   $data['极值'] = $limit; // 极值
    //   return $data;
    //
    // }
    // private getKl8WX($num)
    // {
    //   if ($num >= 210 && $num <= 695) {
    //     return '金';
    //   } elseif ($num >= 696 && $num <= 763) {
    //   return '木';
    // } elseif ($num >= 764 && $num <= 855) {
    //   return '水';
    // } elseif ($num >= 856 && $num <= 923) {
    //   return '火';
    // } elseif ($num >= 924 && $num <= 1410) {
    //   return '土';
    // } else {
    //   return '和';
    // }
    // }
    // private getK3Mult($nums)
    // {
    //   $nums = array_values(array_sort($nums));
    //   if ($nums[0] == $nums[1] && $nums[1] == $nums[2]) {
    //     return Array(
    //       '豹子' => $nums[0] . $nums[0] . $nums[0],
    //   );
    //   } else if ($nums[0] == $nums[1] || $nums[1] == $nums[2]) {
    //   return Array(
    //     '对子' => $nums[1] . $nums[1],
    // );
    // } else if ($nums[0] == $nums[2]) {
    //   return Array(
    //     '对子' => $nums[0] . $nums[0],
    // );
    // } else {
    //   return Array();
    // }
    // }
    private getVingtEtUn($num1, $num2) {
        if ($num1 > $num2) {
            return {'name': '龙', 'class': 'red', 'key': 'dragon'};
        } else if ($num1 < $num2) {
            return {'name': '虎', 'class': 'blue', 'key': 'tiger'};
        } else {
            return {'name': '和', 'class': 'green', 'key': 'middle'};
        }
    }

    private getSingOrDoub($num, $kills = []) {
        if ($kills.indexOf($num) > -1) {
            return {'name': '和', 'class': 'green', 'key': 'middle'};
        }
        if ($num % 2 == 0) {
            return {'name': '双', 'class': 'blue', 'key': 'double'};
        } else {
            return {'name': '单', 'class': 'red', 'key': 'single'};
        }
    }

    private getBigOrSmall($num, $half, $kills = []) {
        if ($kills.indexOf($num) > -1) {
            return {'name': '和', 'class': 'green', 'key': 'middle'};
        }
        if ($num > $half) {
            return {'name': '大', 'class': 'red', 'key': 'big'}; // 大
        } else {
            return {'name': '小', 'class': 'blue', 'key': 'small'}; // 小
        }
    }

    getLhcNums($code) {
        var codeNums = {
            '红波': ("1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46").split(','),
            '蓝波': ("3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48").split(','),
            '绿波': ("5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49").split(','),

            '红大': ("29,30,34,35,40,45,46").split(','),
            '红小': ("1,2,7,8,12,13,18,19,23,24").split(','),
            '红单': ("1,7,13,19,23,29,35,45").split(','),
            '红双': ("2,8,12,18,24,30,34,40,46").split(','),

            '蓝大': ("25,26,31,36,37,41,42,47,48").split(','),
            '蓝小': ("3,4,9,10,14,15,20").split(','),
            '蓝单': ("3,9,15,25,31,37,41,47").split(','),
            '蓝双': ("4,10,14,20,26,36,42,48").split(','),

            '绿大': ("27,28,32,33,38,39,43,44,49").split(','),
            '绿小': ("5,6,11,16,17,21,22").split(','),
            '绿单': ("5,11,17,21,27,33,39,43,49").split(','),
            '绿双': ("6,16,22,28,32,38,44").split(','),
        };
        return codeNums[$code];
    }

    private getLhcColor($num) {
        var $redNum = ("1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46").split(',');
        var $blueNum = ("3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48").split(',');
        var $greenNum = ("5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49").split(',');
        if ($redNum.indexOf($num) > -1) {
            return {'name': '红', 'class': 'red', 'key': 'red'};
        } else if ($blueNum.indexOf($num) > -1) {
            return {'name': '蓝', 'class': 'blue', 'key': 'blue'};
        } else if ($greenNum.indexOf($num) > -1) {
            return {'name': '绿', 'class': 'green', 'key': 'green'};
        } else {
            return '';
        }
    }

    private getLhcZodiac($num) {
        switch ($num % 12) {
            case 1:
                return {'name': '狗', 'class': '', 'key': ''};
            case 2:
                return {'name': '鸡', 'class': '', 'key': ''};
            case 3:
                return {'name': '猴', 'class': '', 'key': ''};
            case 4:
                return {'name': '羊', 'class': '', 'key': ''};
            case 5:
                return {'name': '马', 'class': '', 'key': ''};
            case 6:
                return {'name': '蛇', 'class': '', 'key': ''};
            case 7:
                return {'name': '龙', 'class': '', 'key': ''};
            case 8:
                return {'name': '兔', 'class': '', 'key': ''};
            case 9:
                return {'name': '虎', 'class': '', 'key': ''};
            case 10:
                return {'name': '牛', 'class': '', 'key': ''};
            case 11:
                return {'name': '鼠', 'class': '', 'key': ''};
            case 0:
                return {'name': '猪', 'class': '', 'key': ''};
        }
    }

    private getArrayCount($array) {
        var $count = 0;
        for (var $i in $array) {
            $count += parseInt($array[$i]);
        }
        return $count;
    }
}
