import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddNoteComponent } from './add-note.component';
import { NotesService } from 'src/app/services/notes-service/notes.service';
import { of } from 'rxjs';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let notesService:jasmine.SpyObj<NotesService>;
  beforeEach(() => {
    const notesServiceSpy=jasmine.createSpyObj('NotesService',['postNotesApiCall']);
    TestBed.configureTestingModule({
      declarations: [AddNoteComponent],
      imports:[HttpClientTestingModule],
      providers:[
        {provide:NotesService,useValue:notesServiceSpy}
      ]
    });

    notesService = TestBed.inject(NotesService) as jasmine.SpyObj<NotesService>;
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call postNotesApiCall and emit updateNotesList',()=>{
    const mockNote={title:'Note title',description:'Note description'};
    const mockResponse:any={data:{id:1,...mockNote}};
    notesService.postNotesApiCall.and.returnValue(of(mockResponse));
    spyOn(component.updateNotesList,'emit');
    component.title=mockNote.title;
    component.description=mockNote.description;
    component.handleAddNote('add');
    expect(notesService.postNotesApiCall).toHaveBeenCalledWith(mockNote);
    expect(component.updateNotesList.emit).toHaveBeenCalledWith({data:mockResponse.data,action:'add'});
    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });
});
