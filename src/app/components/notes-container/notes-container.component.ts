import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
import { NotesService } from 'src/app/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit, OnDestroy {
  notesList : any[] = []
  searchQuery: string = ""
  subscription!: Subscription

  constructor(private noteService: NotesService, private dataService: DataService) {}

  ngOnInit(){
    this.noteService.getNotesApiCall().subscribe({next: (res: any) => {
      console.log(res);
      this.notesList = res?.data.filter((note: any) => note.isArchive === false && note.isTrash == false);

    },
    error: (err) => {
      console.log(err);
    }
    })
    this.subscription = this.dataService.currSearchQuery.subscribe({next: (res) => this.searchQuery = res})
  }

  handleUpdateNotesList($event: {data: any, action: string}) {
    console.log($event);
    const {data, action} = $event

    if (action === "add") {
      this.notesList = [data, ...this.notesList]
    }   
    else if(action === "archive" || action === "trash"){
      this.notesList = this.notesList.filter((note) => note.id !== data.id)
    }
    else if(action == "update"){
      this.notesList = this.notesList.map((note:any) => {
        if(note.id == data.id) {
          return data
        }
        return  note
      }) 
    }   
  }
  
  ngOnDestroy() {
    if(this.subscription)
    this.subscription.unsubscribe()
  }
}
