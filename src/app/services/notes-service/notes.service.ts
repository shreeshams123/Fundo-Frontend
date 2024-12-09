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

  postNotesApiCall(data: any) {
    return this.httpService.postApiCall("https://localhost:5000/api/notes", data, { headers: this.getAuthorization() });
  }
  
  archiveNotesApiCall(noteId:number,isArchive:boolean){
    const body=isArchive;
    console.log('Request body for archiving note:', body);
    console.log('Sending API request to archive note:', noteId);
return this.httpService.patchApiCall(`https://localhost:5000/api/notes/archive/${noteId}`,isArchive,{headers:this.getAuthorization()})
  }


  trashNotesApiCall(noteId:number,isTrash:boolean){
    const body=isTrash;
    return this.httpService.patchApiCall(`https://localhost:5000/api/notes/trash/${noteId}`,isTrash,{headers:this.getAuthorization()})
  }

  deleteNoteApiCall(noteId:number){
    return this.httpService.deleteApiCall(`https://localhost:5000/api/notes/${noteId}`,{headers:this.getAuthorization()})
  }

  updateNoteApiCall(noteId:number,data:any){
    return this.httpService.patchApiCall(`https://localhost:5000/api/notes/${noteId}`,data,{headers:this.getAuthorization()})
  }
}
