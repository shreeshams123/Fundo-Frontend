import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotesService } from 'src/app/services/notes-service/notes.service';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() noteDetails: any = {title: "", description: ""}
  @Output() updateNotesList = new EventEmitter<{data: any, action: string}>()
 @Input() containerType:string='';
  @Input() container: string = "notes"
  isColorPaletteVisible:boolean=false;
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,private notes:NotesService) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
  }
  toggleColorPalette(){
    this.isColorPaletteVisible=!this.isColorPaletteVisible;
  }
  handleIconsClick(action: string) {
    if(action == 'archive'){
      console.log('Button clicked, action:', action);
      console.log(this.noteDetails);
      this.notes.archiveNotesApiCall(this.noteDetails.id, true).subscribe({
        next: (res: any) => {
          console.log('Archived note:', res);
          
        },
        error: (err) => console.log('Error archiving note:', err)
      });
      this.updateNotesList.emit({data: this.noteDetails, action : action})
    
  }
  else if(action=='trash'){
    this.notes.trashNotesApiCall(this.noteDetails.id,true).subscribe({
      next: (res: any) => {
        console.log('Trashed note:', res);
        
      },
      error: (err) => console.log('Error Trashing note:', err)
    });
    this.updateNotesList.emit({data: this.noteDetails, action : action})
  }
  else if(action=='unarchive'){
    this.notes.archiveNotesApiCall(this.noteDetails.id,false).subscribe({
      next: (res: any) => {
        console.log('Updated notes list:', res);
        },
      error: (err) => {
        console.log(err);
      }
    });
    this.updateNotesList.emit({data: this.noteDetails, action : action})

  }
  else if(action=='restore'){
    this.notes.trashNotesApiCall(this.noteDetails.id,false).subscribe({
      next:(res:any)=>{
        console.log('Restored notes');
      }
    ,
    error: (err) => console.log('Error fetching notes:', err)
    });
    this.updateNotesList.emit({data:this.noteDetails,action:action})
  }
  else if(action=='delete'){
    this.notes.deleteNoteApiCall(this.noteDetails.id).subscribe(
      {
        next:(res:any)=>{
          console.log("deleted note");
        },
        error:(err)=>{console.log("Error deleting notes",err);}
      }
    );
    this.updateNotesList.emit({data:this.noteDetails,action:action})
  }
  else {
    const payload = {
      id: this.noteDetails.id,
      title: this.noteDetails.title,
      description: this.noteDetails.description,
      color: action,
      isArchive: this.noteDetails.isArchive,
      isTrash: this.noteDetails.isTrash,
      isCreated: this.noteDetails.isCreated
    };
    this.notes.updateNoteApiCall(this.noteDetails.id,payload).subscribe({
      next:(res:any)=>{console.log(res);},error:(err)=>{console.log(err);}});
    this.updateNotesList.emit({data: {...this.noteDetails, color: action}, action: "color"})
  }
  }}
