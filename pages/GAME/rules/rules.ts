import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-rules',
	templateUrl: 'rules.html',
})
export class RulesPage {
	public gameKey: any;
	public gameName: any;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.gameKey = this.navParams.get('gameKey');
		if(this.gameKey=='cqssc'){
			this.gameName="重庆时时彩"
		}else if(this.gameKey=='bjpk10'){
			this.gameName="北京PK10"
		}else if(this.gameKey=='xyft'){
			this.gameName="幸运飞艇"
		}else if(this.gameKey=='hklhc'){
			this.gameName="香港六合彩"
		}else if(this.gameKey=='bjft'){
			this.gameName="番摊(北京)"
		}else if(this.gameKey=='cqft'){
			this.gameName="番摊(重庆)"
		}else if(this.gameKey=='jnd28'){
			this.gameName="加拿大28"
		}else{this.gameName==""}
	}

	ionViewDidLoad() {
	}

}
