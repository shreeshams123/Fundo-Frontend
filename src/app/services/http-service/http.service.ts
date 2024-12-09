import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postApiCall(url: string, data: any, options: any = {}) {
    return this.http.post(url, data, options);
  }
  
  getApiCall(url: string,options:any = {}){
    return this.http.get(url,options);
  }
  patchApiCall(url:string,data:any,options:any={}){
    return this.http.patch(url,data,options);
  }

  deleteApiCall(url:string,options:any={}){
    return this.http.delete(url,options);
  }
}
