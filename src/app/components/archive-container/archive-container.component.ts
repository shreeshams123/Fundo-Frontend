import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
import { NotesService } from 'src/app/services/notes-service/notes.service';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent implements OnInit,OnDestroy {
  archivelist: any[] = [];
  subscription!:Subscription;
  searchQuery:string=""
  constructor(private noteService: NotesService,private dataService:DataService) {}


  ngOnInit(): void {
    this.loadArchivedNotes(); 
    this.dataService.currSearchQuery.subscribe({next:(res)=>this.searchQuery=res})
  }

  loadArchivedNotes(): void {
    this.noteService.getNotesApiCall().subscribe({
      next: (res: any) => {
        console.log('Fetched archived notes:', res);
        this.archivelist = res?.data.filter((note: any) => note.isArchive === true && note.isTrash===false);
      },
      error: (err) => console.log('Error fetching notes:', err),
    });
  }
  handleArchiveNotesList($event:{data:any,action:string}){
console.log($event);
const {data, action} = $event
if(action==='unarchive'){
      this.archivelist = this.archivelist.filter(note => note.id !== data.id);
}
else if(action==='trash'){
  this.archivelist = this.archivelist.filter((note) => note.id != data.id)
}
else if(action == "color"){
  this.archivelist = this.archivelist.map((note:any) => {
    if(note.id == data.id) {
      return data
    }
    return  note
  }) 
} 
  }
  ngOnDestroy(){
    if(this.subscription)
    this.subscription.unsubscribe()
  }
  
  
}
