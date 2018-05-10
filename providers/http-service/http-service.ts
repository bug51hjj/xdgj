import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";
import 'rxjs/add/observable/forkJoin';
@Injectable()
export class HttpServiceProvider {
    public hostName:string="http://api.dk138.vip";
    public headers:any = {
        headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        })
    }
    constructor(private http: Http) {
    }
    //get请求
    get(url: string): Observable<any> {
        return this.http.get(this.hostName+url,this.headers).map(res => res.json());
    }

    //post请求
    post(url: string, body: any): Observable<any> {
        return this.http.post(this.hostName+url, body,this.headers).map(res => res.json());
    }
    gets(reqs:any[]) { //封装多请求get
        let requestArray = [];
        reqs.map(req=>{
            requestArray.push(this.http.get(this.hostName+req.url,this.headers))
        });
        return  Observable.forkJoin(requestArray);
    }
    posts(reqs:any[]){ //封装多请求post
        let requestArray = [];
        reqs.map(req=>{
            requestArray.push(this.http.post(this.hostName+req.url, req.params,this.headers))
        });
        return  Observable.forkJoin(requestArray);
    }
}
//get
/*
    this.HttpService.get(url).subscribe((res: Response) => {
        console.log(res)
    });
*/
//gets 
/*
    let urls = [
        {url:``},
        {url:``}
    ]
    this.HttpService.gets(urls).subscribe(
        result => {
          result.map(item=>{
              console.log(item.json())
          })
        }
    );
*/