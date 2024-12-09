import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes-service/notes.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent implements OnInit{
  trashlist:any[]=[];
  constructor(private readonly noteService:NotesService){}

  ngOnInit(): void {
    this.loadTrashedNotes(); 
  }

  loadTrashedNotes(): void {
    this.noteService.getNotesApiCall().subscribe({
      next: (res: any) => {
        console.log('Fetched trashed notes:', res);
        this.trashlist = res?.data.filter((note: any) => note.isTrash === true);
      },
      error: (err) =>{ console.log('Error fetching notes:', err);}
    });
  }

  handleTrashListNotes($event:{data:any,action:string}){
    const {data,action}=$event;
    if(action==='restore'){

    this.trashlist=this.trashlist.filter(note=>note.id!==data.id);
  }

else if(action=='delete'){
        this.trashlist = this.trashlist.filter(note=>note.id!=data.id);
}

  }}
