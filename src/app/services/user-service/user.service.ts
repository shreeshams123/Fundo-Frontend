import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  loginApiCall(data: any) {
    return this.httpService.postApiCall("https://localhost:5000/api/user/login", data)
  } 

  registerApiCall(data:any){
    return this.httpService.postApiCall("https://localhost:5000/api/user/register",data)
  }
}
