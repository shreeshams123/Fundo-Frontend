import { Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotesService } from 'src/app/services/notes-service/notes.service';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  title: string = ""
  description: string = ""
  isExpanded: Boolean=false;
  color: string = "#ffffff";
  isArchive: boolean = false
  isTrash:boolean=false
  isColorPaletteVisible:boolean=false;

  @Output() updateNotesList = new EventEmitter()

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,private noteservice:NotesService,@Optional() public dialogRef: MatDialogRef<AddNoteComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: {isExpanded: boolean, noteDetails: any}|null) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
    console.log(data);
    if(data) {
      this.isExpanded = data.isExpanded
      this.title = data.noteDetails.title
      this.description = data.noteDetails.description
      this.color = data.noteDetails.color
    }
  }
expandNote(){
  this.isExpanded=true;
}
autoResize(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto'; 
  textarea.style.height = `${textarea.scrollHeight}px`; 
}

archiveNote(){
  this.isArchive=!this.isArchive;
}

trashNote(){
  this.isTrash=!this.isTrash;
}
toggleColorPalette(){
  console.log('color palette set to true');
  this.isColorPaletteVisible=!this.isColorPaletteVisible;
}
setColor(color:string){
this.color=color;
}
handleAddNote() {
  this.isExpanded = !this.isExpanded
  let action="";
  if(this.isArchive==false && this.isTrash==false){
    action='add';
  }
  else if(this.isTrash==false){
    action='archive';
  }
  else{
    action='trash';
  }
  console.log(this.title, this.description,this.isArchive);
  const editedNote={
    id: this.data?.noteDetails?.id ?? null,
    title:this.title,
    description:this.description,
    color:this.color,
    isArchive:this.isArchive,
    isTrash:this.isTrash
  }
  if(this.data){
    this.noteservice.updateNoteApiCall(editedNote.id,editedNote).subscribe({next:(res:any)=>{
    console.log(res);
      },
    error:(err)=>{
      console.log(err);
    }});
    this.dialogRef.close(editedNote);

    }
    else if(!this.data){
      console.log('received a note');
      
      if(this.title || this.description)
      {
        this.noteservice.postNotesApiCall({title:this.title,description:this.description,color:this.color,isArchive:this.isArchive,isTrash:this.isTrash}).subscribe({next:(res: any)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }});
        this.updateNotesList.emit({data:{title:this.title,description:this.description,color:this.color,isArchive:this.isArchive,isTrash:this.isTrash},action:action});
        }
      
      }
  this.title = ""
  this.description = ""
  this.isArchive=false
  this.isTrash=false
  }

  
}



