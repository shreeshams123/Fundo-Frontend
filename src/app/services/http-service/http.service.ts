import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postApiCall(url: string, data: any) {
    return this.http.post(url, data)
  }
  getApiCall(url: string,options:any = {}){
    return this.http.get(url,options);
  }
}
