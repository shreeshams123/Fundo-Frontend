import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notesList : any[] = []

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    //api call to get notes
    this.noteService.getNotesApiCall().subscribe({next: (res: any) => {
      console.log(res);
      this.notesList = res?.data.filter((note: any) => note.isArchive === false && note.isTrash == false);

    },
    error: (err) => {
      console.log(err);
    }
    })
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
    else if(action == "color"){
      this.notesList = this.notesList.map((note:any) => {
        if(note.id == data.id) {
          return data
        }
        return  note
      }) 
    }   
  }
  
}
