import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpService:HttpService) { }
  
  getAuthorization() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
    })
    return headers
  }

  
  getNotesApiCall(){
    return this.httpService.getApiCall("https://localhost:5000/api/notes", {headers : this.getAuthorization()})
  }
}
