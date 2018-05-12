import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetDateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetDateProvider {
	public now = new Date(); //当前日期
	public nowDayOfWeek; //今天本周的第几天
	public nowDay; //当前日
	public nowMonth; //当前月
	public nowYear; //当前年
	constructor(public http: HttpClient) {
		this.nowDayOfWeek = this.now.getDay();
		this.nowDay = this.now.getDate();
		this.nowMonth = this.now.getMonth();
		this.nowYear = this.now.getFullYear();
	}
	formatDate(date) { //格式化日期
	    let myyear = date.getFullYear();
	    let mymonth = date.getMonth() + 1;
	    let myweekday = date.getDate();
	    if (mymonth < 10) {
	        mymonth = "0" + mymonth;
	    }
	    if (myweekday < 10) {
	        myweekday = "0" + myweekday;
	    }
	    return (myyear + "" + mymonth + "" + myweekday);
	}
    //获取今天的日期
    today(){
		let weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay);
		return this.formatDate(weekEndDate);
    }
    //获取昨天的日期
    yesterday(){
    	let weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay-1);
	    return this.formatDate(weekEndDate);
    }
    //获得本周的开始日期
	weekStartDate() {
		let weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek);
		return this.formatDate(weekStartDate);
	}
	//获得本周的结束日期
	weekEndDate() {
	    let weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayOfWeek));
	    return this.formatDate(weekEndDate);
	}
	//获得上周的开始日期
	lastWeekStartDate() {
	    var weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek - 7);
	    return this.formatDate(weekStartDate);
	}
	//获得上周的结束日期
	lastWeekEndDate() {
	    var weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek - 1);
	    return this.formatDate(weekEndDate);
	}
	//秒数转分秒
	s_to_hs(s){
		if(s<=0){return '00:00'}
		var h;
		h  =   Math.floor(s/60);
		s  =   s%60;
		h    +=    '';
		s    +=    '';
		h  =   (h.length==1)?'0'+h:h;
		s  =   (s.length==1)?'0'+s:s;
		return h+':'+s;
	}

}
