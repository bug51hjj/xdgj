import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DealPriceListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DealPriceListProvider {

	constructor(public http: HttpClient) {
	console.log('Hello DealPriceListProvider Provider');
	}
	datatype(type,_data){
		if(type==='cqssc1to5'){
			let lineArray = [];
			for(let i=0;i<_data.length;i++){
				let _data_i = _data[i];
				let lineArray2 = {line:[],type:'cqssc1to5',type_name:''}
				for(let j=0;j<_data_i.line.length;j++){
					if(typeof _data_i.line[j].play_name =='number'){
						let lineArray3 = []
						for(let k=0;k<5;k++){
							lineArray3.push(_data_i.line[j])
						}
						lineArray2.line.push(lineArray3)
					}
				}
				lineArray.push(lineArray2);
			}
			return lineArray;
		}else if(type==='bjpk101to10'){
			return []
		}else{return _data}
	}

}
